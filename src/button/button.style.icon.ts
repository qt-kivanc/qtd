import { css } from "styled-components";
import { StyledElementProps } from "types/ButtonProps";

/**
* ICON
*/
export const getIcon = (Icon:StyledElementProps) => {
 return css`
   &.qtd-icon {
     
     padding: 0 12px 0 12px;

     /* X-SMALL */
     &.qtd-button-xs {
       ${Icon} { font-size: 10px; }
     }

     /* SMALL */
     &.qtd-button-sm {
       ${Icon} { font-size: 16px; }
     }

     /* MEDIUM */
     &.qtd-button-md {
       ${Icon} { font-size: 18px; }
     }

     /* LARGE */
     &.qtd-button-lg {
       ${Icon} { font-size: 26px; }
     }

     /* DEFAULT */
     &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-md):not(&.qtd-button-lg):not(&.qtd-button-xlg) 
     {
       ${Icon} { font-size: 20px; }
     }
     
   }
 `
}