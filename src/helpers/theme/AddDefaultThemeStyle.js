
/**
 * 
 */
export default function AddDefaultThemeStyle() {
  
  const styleSheet = document.createElement('style');
  document.head.appendChild(styleSheet);
  styleSheet.textContent = ":root{color: #ffffff}";

}
