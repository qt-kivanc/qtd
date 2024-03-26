export default function RemoveUnits(value: string) {

  if ( !value ) return 0;

  value = value.replaceAll('%', '')
               .replaceAll('px', '')
               .replaceAll('em', '')
               .replaceAll('ex', '')
               .replaceAll('ch', '')
               .replaceAll('rem', '')
               .replaceAll('vw', '')
               .replaceAll('vh', '')
               .replaceAll('vmin', '')
               .replaceAll('vmax', '')
               .replaceAll('pt', '')
               .replaceAll('pc', '')
               .replaceAll('in', '')
               .replaceAll('mm', '')
               .replaceAll('cm', '');

  return parseInt(value);

}