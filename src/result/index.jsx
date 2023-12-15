import React, { useEffect, useState } from 'react';

import { 
  Body, Content, ContentWrapper, ContentDescription, Extras, 
  Footer, ImageWrapper, Title, 
  Wrapper
} from './styled.components';
import CoreImage from '../image/index.jsx';

const Result = ({
  image = "",
  title = "",
  description = "",
  extra = null,
  footer = null,
  type = "default",
  fill = false,
  autoCenter = true
}) => {

  const [show, SetShow] = useState(true);
  const [icon, SetIcon] = useState("");

  useEffect(() => {

    if ( image === "" ) return;
    SetIcon(image);

  }, [image]);

  const getExtras = () => {

    if ( extra ) {
      return (
        <Extras className="qtd-result-extras">
          { extra }
        </Extras>
      )
    }

  }

  const getFooter = () => {

    if ( footer ) {
      return (
        <Footer className="qtd-result-footer">
          { footer }
        </Footer>
      )
    }

  }

  const getClassNames = () => {

    let names = "qtd-result";

    names += " qtd-result-" + type;

    if ( autoCenter ) names += " qtd-result-auto-center";
    if ( fill ) names += " qtd-result-fill";

    return names;

  }

  const getContent = () => (

    <Wrapper className={getClassNames()}>
      <ContentWrapper 
        $autoCenter={autoCenter} 
        className="qtd-result-content-wrapper"
      >
        <Content 
          className="qtd-result-content"
          $autoCenter={autoCenter} 
          type={type} 
          fill={fill.toString()}
        >
          <Body className="qtd-result-body">
            <ImageWrapper className="qtd-image-wrapper">
              <CoreImage src={icon} />
            </ImageWrapper>
            <Title className="qtd-result-title">
              {title}
            </Title>
            <ContentDescription className="qtd-result-sub-title">
              {description}
            </ContentDescription>
          </Body>
          { getExtras() }
          { getFooter() }
        </Content>
      </ContentWrapper>
    </Wrapper>

  )

  return !show ? null : getContent();
  
}

export default Result;