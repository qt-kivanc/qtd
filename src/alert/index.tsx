import { ReactSVG } from "react-svg";
import InfoIcon from './infoicon.svg';
import { AlertProps } from "../index";
import { Description, IconWrapper, Texts, Title, Wrapper } from "./styled";

const Alert = ({
  type,
  size,
  title,
  className,
  children
}:AlertProps) => {

  const getSize = () => {
    if (      size === "x-small" )   return "xs";
    else if ( size === "small" )     return "sm";
    else if ( size === "medium" )    return "md";
    else if ( size === "default" )   return "df";
    else if ( size === "large" )     return "lg";
    else if ( size === "x-large" )   return "xlg";
    else return "df";
  }

  const getClassNames = () => {

    let names = "qtd-alert";

        names += " qtd-alert-" + type;
        names += " qtd-alert-" + getSize();
      
    if ( className !== "" )             names += " " + className;

    return names;

  }
  
  const getContent = () => (

    <Wrapper className = {getClassNames()}>
      <IconWrapper>
        <ReactSVG src={InfoIcon} />
      </IconWrapper>
      <Texts $noTitle={!title}>
        { title ? <Title>{title}</Title> : null}
        <Description>{ children }</Description>
      </Texts>
    </Wrapper>
  
  )

  return getContent();

}

export const AlertDefaultProps = {
  type        : "info",
  size        : "small",
  className   : "",
  children    : ""
} as Required<AlertProps>;

Alert.defaultProps = AlertDefaultProps;

export default Alert;