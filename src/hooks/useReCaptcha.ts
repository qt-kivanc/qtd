import { useEffect, useState } from "react";
import ConsoleLog from "../logger";

/**
 * 
 * window objesine event listener ekler ve 
 * kullanıcı online ve offline olduğunda çağrılır.
 * 
 * @param {*} handler 
 * 
 */

declare const window: any;

type Nullable<T> = T | null; 
type THandler = Nullable<(value:string | null) => void>;

const useReCaptcha = (handler: THandler) => {

  let script:HTMLScriptElement;

  const [reCaptchaKey, SetReCaptchaKey] = useState("");

  useEffect(() => {

    return () => {
      document.body.removeChild(script);
    };

  }, []);

  const executeReCaptcha = () => {

    if ( reCaptchaKey === "" ) {
      ConsoleLog.double("useReCaptcha", "Not yet initialized! reCaptcha can't execute right now.", "error");
      if ( handler ) handler(null);
      return;
    }
    
    window.grecaptcha.ready((_:any) => {
      try {
        window.grecaptcha
          .execute(reCaptchaKey, { 
            action: "login" 
          })
          .then((token:string) => {
            ConsoleLog.double("ReCaptcha V3", "Token is valid");
            console.log("token: " + token);
            if ( handler ) handler(token);
          });
      } 
      catch(e){
        ConsoleLog.double("ReCaptcha V3", "Token is invalid", "error");
      };
    });

  }

  const loadReCaptcha = (key:string) => {

    script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=" + key;
    script.onload = function() {
      SetReCaptchaKey(key);
    }
    
    document.body.appendChild(script);

  }

  return {loadReCaptcha, executeReCaptcha};

};

export default useReCaptcha;
