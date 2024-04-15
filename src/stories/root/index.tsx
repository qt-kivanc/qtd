import { ChildrenProps } from "types/ChildrenProps";
import { useAddExternalCSS } from "../../index";
import "./index.scss";

const StoryRoot = ({ children }: {
  children: ChildrenProps;
}) => {

  useAddExternalCSS(
    "//fonts.googleapis.com/css?family=Inter:300,400,500,600,700"
  );

  return (
    <div style={{fontFamily:"Inter"}}>
      {children}
    </div>
  )
}

export default StoryRoot;