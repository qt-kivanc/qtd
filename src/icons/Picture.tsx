const Picture = ({ className = "", height = 24, width = 24 }) => {
  return (
    <svg
      className = {className}
      height    = {height}
      width     = {width}
      xmlns     = "http://www.w3.org/2000/svg"
      viewBox   = "0 0 24 24"
    >
     <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <polygon points="0 0 24 0 24 24 0 24"/>
        <rect fill="#000000" opacity="0.3" x="2" y="4" width="20" height="16" rx="2"/>
        <polygon fill="#000000" opacity="0.3" points="4 20 10.5 11 17 20"/>
        <polygon fill="#000000" points="11 20 15.5 14 20 20"/>
        <circle fill="#000000" opacity="0.3" cx="18.5" cy="8.5" r="1.5"/>
      </g>
    </svg>
  );
};

export default Picture;