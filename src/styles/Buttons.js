
import styled from 'styled-components';
import Theme from './Styles';

export const RecipeFileInputButton = styled.div`
    [type="file"] {
      border: 0;
      clip: rect(0, 0, 0, 0);
      height: 1px;
      overflow: hidden;
      padding: 0;
      position: absolute !important;
      white-space: nowrap;
      width: 1px;
    }
    
    [type="file"] + label {
      background-color: ${Theme.colors.main_button_background_color};
      padding: 8px 14px 8px 14px;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
    }
    
    [type="file"] + label:hover {
        background-color: ${Theme.colors.main_button_hover_backgroud_color};
    }
`;


export const RecipeSubmitButton = styled.button`
    background-color: ${Theme.colors.submit_button_color};
    padding: 8px 14px 8px 14px;
    border-radius: 4px;
    border: 0;
    color: #fff;
    cursor: pointer;

    :hover {
        background-color: ${Theme.colors.submit_button_hover_background_color};
    }
`;
