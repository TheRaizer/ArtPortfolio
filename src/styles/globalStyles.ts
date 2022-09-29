import { createGlobalStyle } from 'styled-components';
import { colors } from './globalColors';

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
         --scrollbar-width: calc(100vw - 100%);
         --vw-no-scrollbar: calc(100vw - var(--scrollbar-width));
         ${colors}
        font-family: 'Inter-Regular', sans-serif;
        line-height: normal;
        background-color: rgb(39, 45, 45);
        color: white;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    button {
        cursor: pointer;
    }
    h1 {
        font-size: 6em;
        font-weight: bold;
    }
    h2 {
        font-size: 5em;
        font-weight: bold;
    }
    h3 {
        font-size: 4em;
        font-weight: bold;
    }
    h4 {
        font-size: 3em;
        font-weight: bold;
    }
    h5 {
        font-size: 2em;
        font-weight: bold;
    }
    a {
        color: inherit;
        text-decoration: inherit;
    }
    img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;

        -khtml-user-select: none;
        -o-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    button, input[type="submit"], input[type="reset"] {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    } 
    textarea:focus, input:focus{
        outline: none;
    }
    textarea, input {
        font-family: inherit;
        font-size: inherit;
    }
    @font-face {
        font-family: Inter-Regular; 
        src: url('/fonts/Inter-Regular.ttf'); 
    }
`;

export default GlobalStyle;
