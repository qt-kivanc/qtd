import { FormEvent, useEffect, useState } from "react";
import { AxiosProgressEvent } from "axios";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import {
  Button, ButtonProps, Image, ModalManager, ModalProps, Notification,
  useCoreFetch, FormatBytes, CheckFileURL, FileTypes, Trash, ZoomIn,
  Picture, UploadProps, UploadProgressProps, UploadResultMessageProps,
  GetTypeByFileType,
  UploadIcon,
  Wait
} from "../index";
import { v4 } from "uuid";

import {
  CenterContent, Icons, FileContent, Label, Overlay, OverlayContent,
  Uploading, Wrapper, UploadStatusBox
} from "./styled";

type HideProgressProps = {
  path?         : string,
  errorMessage? : string,
  errorCode?    : number
}

/**
 * 
 * UPLOAD
 * --
 * 
 * 
 * 
 * @returns 
 * 
 */
const Upload = ({
  resultFileName      = null,
  action              = "",
  filePath            = "",
  binaryName          = "file",
  showDeleteIcon      = false,
  showPreviewIcon     = false,
  padding             = 10,
  fileHeight          = 50,
  previewFileHeight   = 120,
  requestMethod       = "put",
  maxFileSize         = 1024,
  disabled            = false,
  extraFormData       = {},
  extraQueryString    = {},
  fileTypes           = [FileTypes.JPG, FileTypes.PNG, FileTypes.SVG, FileTypes.PDF],
  removeAction        = "",
  removeExtraFormData = {},
  onUploadSuccess,
  onUploadFailed,
  onRemoveFileSuccess,
}:UploadProps) => {

  const { addNotification } = Notification.useNotifications();
  const { showModal }       = ModalManager.useModal();
  const { fetch, cancel }   = useCoreFetch();
  const { t }               = useTranslation();
  
  const [firstCheck,          SetFirstCheck]          = useState<boolean>(false);
  const [isDisabled,          SetIsDisabled]          = useState<boolean>(false);
  const [acceptedFileTypes,   SetAcceptedFileTypes]   = useState<string>(".svg, .png, .jpg");
  const [isOverlayOver,       SetIsOverlayOver]       = useState<boolean>(false);
  const [isDragOver,          SetIsDragOver]          = useState<boolean>(false);
  const [isFocusOver,         SetIsFocusOver]         = useState<boolean>(false);
  const [hasFile,             SetHasFile]             = useState<boolean>(false);
  const [currentFilePath,     SetCurrentFilePath]     = useState<string>("");
  
  const [isUploading,         SetIsUploading]         = useState<boolean>(false);
  const [uploadProgress,      SetUploadProgress]      = useState<UploadProgressProps | null>(null);
  const [showUploadComplete,  SetShowUploadComplete]  = useState<boolean>(false);
  const [uploadResultMessage, SetUploadResultMessage] = useState<UploadResultMessageProps | null>(null);

  useEffect(() => {

    return(() => {
      cancel();
    })

  }, []);

  useEffect(() => {
    SetIsDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    SetCurrentFilePath(filePath ? filePath.split("?")[0] : "");
  }, [filePath]);

  useEffect(() => {
    if ( currentFilePath !== null ) {
      checkFile();
    }
  }, [currentFilePath]);

  /**
   * It checks all the uploadable file formats and converts them
   * into a format understandable by HTML, then saves them
   * to the acceptedFileTypes variable.
   */
  useEffect(() => {

    let supportedTypes:string[] = [];

    fileTypes.map(type => {
      supportedTypes.push(GetTypeByFileType(type));
    });

    SetAcceptedFileTypes(supportedTypes.join(", "));

  }, [fileTypes]);

  const addNotificationError = (title:string, description:string) => {
    addNotification({
      title       : title,
      description : description,
      placement   : "topRight",
      autoHide    : true,
      delay       : 5000,
      type        : "error"
    });
  };

  const checkFile = async () => {

    let hasFileFound: boolean = false;

    if ( currentFilePath ) {
      
      console.time("Checking file completed in");
      
      hasFileFound = await CheckFileURL(currentFilePath);
      
      SetHasFile(hasFileFound);

      if ( !firstCheck ) {
        SetFirstCheck(true);
      }

      console.timeEnd("Checking file completed in");

    }

  }

  const resetUpload = () => {
    SetUploadResultMessage(null);
    SetUploadProgress(null);
    SetShowUploadComplete(false);
    SetCurrentFilePath("");
    SetFirstCheck(false);
  }

  const removeUploadedFile = () => {

    if ( !removeAction ) {
      resetUpload();
    }
    else {

      fetch({
        action    : removeAction,
        params    : removeExtraFormData,
        onFetched : (data) => {
          resetUpload();
          onRemoveFileSuccess && onRemoveFileSuccess(data);
        }
      });

    }

  }

  const handleOnRemove = async () => {

    SetIsDisabled(true);

    showModal({
      content             : <div>{t("uploader.areYouSureToDeleteThisFile")}</div>,
      title               : t("uploader.removeFile"),
      okButtonText        : t("uploader.yes"),
      cancelButtonText    : t("uploader.no"),
      okButtonProps       : {
        variant : "statable",
        state   : "reject"
      } as ButtonProps,
      closeOnClickOutside : false,
      showCloseButton     : false,
      onOk() {
        removeUploadedFile();
        SetIsDisabled(false);
        return true;
      },
      onCancel() {
        SetIsDisabled(false);
        return true;
      },
    } as ModalProps);

  }

  const handleDragOver = (event:any) => {

    event.preventDefault();
    if ( isUploading ) return;

    SetIsDragOver(true);

  }
  
  const handleDragLeave = (event:any) => {

    event.preventDefault();
    if ( isUploading ) return;

    SetIsDragOver(false);

  }
  
  const handleDrop = (event:any) => {
    
    event.preventDefault();
    if ( isUploading ) return;
    
    SetIsDragOver(false);

    if ( event.dataTransfer && event.dataTransfer.files.length !== 0 ) {
      /**
       * The first file from the selected files.
       */
      checkByFile(event.dataTransfer.files[0]);
    }
    else {
      console.log(t("uploader.browserDoesntSupportDND"));
    }

  }

  const handleFileChange = (event:FormEvent) => {

    SetIsDragOver(false);
    SetIsFocusOver(false);

    const target              = event.target as HTMLInputElement;
    const selectedFile: File  = (target.files as FileList)[0];

    checkByFile(selectedFile);

  };


  /**
   * Checks the file formats of the file to be uploaded,
   * returns true if it is among the defined formats,
   * false otherwise.
   * 
   * @param file  The file to be uploaded.
   * @returns 
   */
  const checkFileType = (file:File) => {

    if (!fileTypes.includes((file.type as FileTypes))) {

      addNotificationError(
        t('uploader.error'),
        t('uploader.fileFormatError', { fileFormat: acceptedFileTypes })
      );
      
      return false;

    }

    return true;

  }

  /**
   * Checks the size of the file to be uploaded, returns true if it
   * is within the specified limits, false otherwise.
   * 
   * @param file  The file to be uploaded.
   * @returns 
   */
  const checkFileSize = (file:Blob) => {

    if (file.size > maxFileSize * 1024) {
      
      addNotificationError(
        t('uploader.error'),
        t('uploader.fileSizeError', { fileSize: FormatBytes(maxFileSize * 1024) })
      );
      
      return false;

    }

    return true;

  }

  const hideProgress = async ({path, errorMessage, errorCode}:HideProgressProps) => {

    console.log("hideProgress > path", path);
    console.log("hideProgress > errorMessage", errorMessage);
    console.log("hideProgress > errorCode", errorCode);

    await Wait(1000);

    SetUploadProgress(null);
    SetIsUploading(false);

    await Wait(1500);

    SetShowUploadComplete(false);

    if ( path) {
      onUploadSuccess && onUploadSuccess(path);
    }
    else if ( errorMessage) {
      onUploadFailed && onUploadFailed(errorMessage, errorCode ? errorCode : 0);
    }

  }

  const uploadFile = async (file:File) => {

    if ( !file ) return;

    let formData = new FormData();
        formData.append(binaryName, file);

    if (resultFileName) {
      formData.append("name", resultFileName);
    }

    Object.keys(extraFormData).forEach(key => {
      formData.append(key, extraFormData[key]);
    });

    fetch({
      action        : action,
      requestMethod : requestMethod,
      params        : formData,
      queries       : extraQueryString,
      onFetched     : (result:any) => {

        console.log("result", result);
        
        if ( result.data.success ) {
          
          SetUploadResultMessage({
            message : t("uploader.fileUploadSuccess"),
            status  : "success"
          });
          SetShowUploadComplete(true);
          SetCurrentFilePath(result.data.data.url);
          
          hideProgress({path: result.data.data.url});
        
        }
        else {
          
          SetUploadResultMessage({
            message : t("uploader.fileUploadFailed"),
            status  : "error"
          });
          
          hideProgress({errorMessage: t("uploader.fileUploadFailed")});

        }

      },
      onError     : (message:string, code:number) => {

        console.log("onError");
        SetUploadResultMessage({
          message   : t("uploader.fileUploadFailed"),
          status    : "error"
        });

        hideProgress({
          errorMessage  : message,
          errorCode     : code
        });

      },
      onProgress  : (event:AxiosProgressEvent) => {
        console.log("onProgress");
        /**
         * It listens to the `AxiosProgressEvent` returned from *Axios*
         * and converts the file upload progress information into
         * a format understandable by the user.
         */
        SetUploadProgress({
          estimated : event.estimated ? (Math.round(event.estimated * 100) / 100).toFixed(2) : "0",
          progress  : event.progress  ? Math.round(event.progress * 100) : 0,
          bytes     : event.bytes     ? FormatBytes(event.bytes) : "",
          total     : event.total     ? FormatBytes(event.total) : ""
        });

      }
      
    });

  }
  
  /**
   * When a file is selected or dropped, it first checks the file.
   * If it meets the defined conditions, it initiates the upload process.
   * 
   * @param file  The file to be uploaded.
   * @returns 
   */
  const checkByFile = (file:File) => {

    if ( !file ) return;

    if ( !checkFileType(file) ) return;
    if ( !checkFileSize(file) ) return;

    /**
     * If a file name is provided,
     * rename the file name to be uploaded.
     */
    if ( resultFileName ) {
      const type = GetTypeByFileType(file.type as FileTypes);
      file = new File([file], resultFileName + type, {
        type              : type,
        lastModified      : file.lastModified
      });
    }

    uploadFile(file);
    SetIsUploading(true);

  }

  /**
   * The content of the file to be displayed in the preview.
   * @returns 
   */
  const getPreviewFileContent = () => (
    <CenterContent
      className = "qtd-upload-preview-content"
      $height   = {previewFileHeight}
      $padding  = {padding}
    >
      <Image
        src     = {currentFilePath}
        height  = {previewFileHeight}
      />
    </CenterContent>
  )

  /**
   * If there is an uploaded file, the preview button will appear.
   * When this button is pressed, it works here and opens a modal
   * showing the preview of the uploaded file.
   */
  const previewFile = () => {

    SetIsDisabled(true);

    showModal({
      content             : getPreviewFileContent(),
      showOkButton        : false,
      showCancelButton    : false,
      onCancel() {
        SetIsDisabled(false);
        return true;
      },
    } as ModalProps);

  }

  const getDeleteIcon = () => {

    if ( !showDeleteIcon || !currentFilePath || isUploading || !hasFile ) return;

    return (
      <Tooltip title={t("uploader.delete")}>
        <span>
          <Button variant="solid" size="small" circle
            onClick   = {handleOnRemove}
            disabled  = {isDisabled}
            icon      = {
              <Trash width={16} height={16} />
            }
            className = "qtd-upload-delete-button"
          />
        </span>
      </Tooltip>
    )
  
  }

  const getPreviewIcon = () => {

    if ( !showPreviewIcon || !currentFilePath || isUploading || !hasFile ) return;

    return (
      <Tooltip title={t("uploader.preview")}>
        <span>
          <Button variant="solid" size="small" circle
            onClick   = {previewFile}
            disabled  = {isDisabled}
            icon      = {
              <ZoomIn width={16} height={16} />
            }
            className = "qtd-upload-preview-button"
          />
        </span>
      </Tooltip>
    )
  
  }

  /**
   * If there is an uploaded file, it returns it first; if not,
   * it returns the first file sent. If none are available,
   * meaning a file will be uploaded from scratch,
   * it returns nothing.
   * 
   * @returns 
   */
  const getFile = () => {

    /**
     * Eğer henüz ilk yükleme yapılmadıysa ve yüklenecek bir dosya
     * varsa hiçbir şey gösterme.
     */
    if ( !firstCheck && currentFilePath !== "" ) {
      return;
    }

    /**
     * Eğer henüz ilk yükleme yapılmadıysa ve yüklenecek bir dosya
     * yoksa upload ikonunu gösterir.
     */
    if ( !firstCheck && currentFilePath === "" ) {
      return <UploadIcon width={30} height={30} />;
    }

    /**
     * Eğer yüklenecek dosya yüklenemiyor ise bozuk dosya
     * görselini göster.
     */
    if ( !hasFile ) {
      return <Picture width={40} height={40} />;
    }

    /**
     * Her şey tamamsa dosyayı gösterir.
     */
    return (
      <Image
        src     = {currentFilePath}
        height  = {fileHeight}
      />
    );

  }

  /**
   * It's only displayed during file upload. During upload, the `isUploading` variable becomes true, 
   * and in this state, a div indicating the upload is shown. The `uploadProgress` variable being
   * filled indicates an ongoing upload, in which case a div showing the progress of the upload
   * begins to fill, and the upload status is displayed on the screen. Upon completion of the upload,
   * the `showUploadComplete` variable becomes true, causing the div indicating the upload status to
   * change color to indicate that the upload is complete. Before displaying the new file, the div
   * indicating the first upload is hidden. The div displaying the upload status is set to `width: 0%`,
   * causing the div to slowly shrink, and while shrinking, the uploaded file is shown.
   * @returns 
   */
  const getUploading = () => (

    <Uploading
      className = "qtd-upload-status"
      $isActive = {isUploading}
      $complete = {uploadResultMessage?.status === "success"}
      $error    = {uploadResultMessage?.status === "error"}
    >

      <UploadStatusBox
        className = "qtd-upload-status-box"
        $progress = {uploadProgress ? uploadProgress.progress : 0}
        $complete = {uploadResultMessage?.status === "success"}
        $error    = {uploadResultMessage?.status === "error"}
      />

      <span className = "qtd-upload-status-message">
        {
          (showUploadComplete || uploadResultMessage)
            ? t(String(uploadResultMessage?.message))
            : t("uploader.fileUploading")
        }
      </span>
      {
        uploadProgress
        ? 
          <span className = "qtd-upload-status-info">
            {
              t(
                "uploader.info",
                { 
                  total     : uploadProgress.total,
                  estimated : uploadProgress.estimated
                }
              )
            }
          </span>
        :
          <span className = "qtd-upload-status-calculating">
            { t("uploader.calculating") }
          </span>
      }
    </Uploading>

  )

  const getOverlay = () => {

    let isHover = (isOverlayOver || isDragOver) && !isUploading && !isDisabled;

    return (
      <Overlay
        onPointerOver = {() => {!isDragOver && SetIsOverlayOver(true)}}
        onPointerOut  = {() => {!isDragOver && SetIsOverlayOver(false)}}
        onDragOver    = {handleDragOver}
        onDragLeave   = {handleDragLeave}
        onDrop        = {handleDrop}
        $isHover      = {isHover}
        className     = "qtd-upload-overlay"
      >
        <OverlayContent
          $isHover  = {isHover}
          className = "qtd-upload-overlay-content"
        >
          <span className="qtd-upload-header">
            {t("uploader.header")}
          </span>
          <span className="qtd-upload-hint">
            {t("uploader.hint")}
          </span>
        </OverlayContent>
      </Overlay>
    )

  }

  const getContent = (id=v4()) => (

    <Wrapper className="qtd-upload">
      <input
        type      = "file"
        id        = {id}
        accept    = {acceptedFileTypes}
        onChange  = {handleFileChange}
        onFocus   = {() => SetIsFocusOver(isUploading ? false : true)}
        onBlur    = {() => SetIsFocusOver(false)}
        onClick   = {() => SetIsFocusOver(false)}
        disabled  = {isUploading || isDisabled}
        //hidden
        //multiple
      />
      <Label
        htmlFor       = {id}
        $showFocus    = {isFocusOver}
        className     = "qtd-upload-label"
      >
        <FileContent
          $showBorder   = {isDragOver}
          $padding      = {padding}
          className     = "qtd-upload-content"
        >
          { getFile() }
          { getUploading() }
          { getOverlay() }
          <Icons className="qtd-upload-icons">
            { getDeleteIcon() }
            { getPreviewIcon() }
          </Icons>
        </FileContent>
      </Label>
    </Wrapper>

  )

  return getContent();

}

export default Upload;