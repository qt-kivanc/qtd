const Checkmark = ({ className, height, width }) => {
  return (
    <svg
      className={className}
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M7.23414885,20 C6.61457659,20 6.02393992,19.722943 5.61844589,19.2381945 L0.512159937,13.1296111 C-0.252485941,12.2146448 -0.149120286,10.8375884 0.743192631,10.0535303 C1.63510994,9.26860293 2.97801573,9.37459276 3.74356585,10.2900226 L7.08178482,14.2832718 L17.632259,1.23794707 C19.2654251,-1.10773692 20.9747731,0.191203411 19.3343732,2.54691269 L8.96519861,19.0863086 C8.58479718,19.6321359 7.98093604,19.9681277 7.32779395,19.9977979 C7.29625867,19.9991308 7.26523202,20 7.23414885,20 Z"></path>
    </svg>
  );
};

export default Checkmark;
