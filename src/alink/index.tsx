import { NavigationLink } from './styled';

const ALink = (props:any) => {

  const getRoute = () => {

    //let resolved = useResolvedPath(to);
    //let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <NavigationLink
        to={props.to}
        {...props}
      >
        {props.children}
      </NavigationLink>
    );
      
  }

  return getRoute();

}

export default ALink;