import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

export default createGlobalStyle<{theme: Theme}>`
  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: "Kumbh Sans";
    src: url("/assets/fonts/KumbhSans-Bold.ttf") format("truetype");
    font-weight: 700;
  }

  @font-face {
    font-family: "Kumbh Sans";
    src: url("/assets/fonts/KumbhSans-Regular.ttf") format("truetype");
    font-weight: 400;
  }

  ${props => {
    const { colors } = props.theme;

    return `
      body {
        background-color: ${colors.secondary[1]};
        color: ${colors.primary[2]};
        font-family: "Kumbh Sans";
      }

      h1, h2, h3, h4 {
        font-weight: 700;
        margin: 0;
      }
    
      h1 {
        font-size: 28px;
        line-height: 34px;
      }

      h2 {
        font-size: 24px;
        line-height: 29px;
      }

      h3 {
        font-size: 20px;
        line-height: 24px;
      }

      h4 {
        font-size: 14px;
        line-height: 18px;
      }

      p, li, a, button {
        font-size: 16px;
        color: ${colors.secondary[2]};
        line-height: 26px;
        margin: 0;
      }
    `;
  }}
`