import { SvgIcon } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import classes from "./configure.module.css";

function ProjectIcon(props) {
  const { color, className, width, height } = props;
  return (
    <svg viewBox="0 0 1000 200" width="1000" height="200" preserveAspectRatio="xMidYMid meet" className={ classes.someIcon }>
      <g fill="#ffc800" opacity="1" stroke="none">
      <path clipPath="url(#TextBounds)" d="M34.0449 236.256L84.5849 236.256C107.965 236.256 121.685 226.036 121.685 209.236L121.685 208.956C121.685 195.656 114.125 188.936 102.225 185.016C110.905 181.236 117.345 174.516 117.345 163.176L117.345 162.896C117.345 156.176 114.965 150.996 111.045 147.076C105.305 141.336 96.6249 138.256 84.3049 138.256L34.0449 138.256L34.0449 236.256ZM60.5049 177.316L60.5049 160.096L78.1449 160.096C86.2649 160.096 90.4649 163.176 90.4649 168.496L90.4649 168.776C90.4649 174.516 85.8449 177.316 77.5849 177.316L60.5049 177.316ZM60.5049 214.416L60.5049 196.356L81.2249 196.356C90.3249 196.356 94.5249 199.856 94.5249 205.176L94.5249 205.456C94.5249 211.196 89.7649 214.416 81.5049 214.416L60.5049 214.416Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds)" d="M166.105 236.256L193.405 236.256L193.405 138.256L166.105 138.256L166.105 236.256Z" fillRule="evenodd"/>
      </g>
      <g fill="#ffffff" opacity="1" stroke="none">
      <path clipPath="url(#TextBounds_2)" d="M243.145 236.256L317.765 236.256L317.765 212.456L270.305 212.456L270.305 138.256L243.145 138.256L243.145 236.256Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds_2)" d="M361.345 236.256L388.645 236.256L388.645 138.256L361.345 138.256L361.345 236.256Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds_2)" d="M437.965 236.256L475.205 236.256C510.485 236.256 531.065 215.256 531.065 186.976L531.065 186.696C531.065 158.416 510.765 138.256 475.765 138.256L437.965 138.256L437.965 236.256ZM465.125 212.176L465.125 162.336L476.185 162.336C492.425 162.336 503.205 171.436 503.205 187.116L503.205 187.396C503.205 203.216 492.425 212.176 476.185 212.176L465.125 212.176Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds_2)" d="M576.465 236.256L651.085 236.256L651.085 212.456L603.625 212.456L603.625 138.256L576.465 138.256L576.465 236.256Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds_2)" d="M704.185 236.256L731.485 236.256L731.485 199.156L768.725 138.256L738.345 138.256L718.045 173.956L697.885 138.256L666.945 138.256L704.185 199.576L704.185 236.256Z" fillRule="evenodd"/>
      </g>
    </svg>
  );
}

function Configure({ theme }) {
  return (
    <div className={classes.configureContainer}>
      <ProjectIcon
        color={
          (theme.palette.type === "dark"
          ? true
          : false)
            ? "white"
            : "rgb(33, 37, 41)"
        }
        altColor={
          (theme.palette.type === "dark"
          ? true
          : false)
            ? "rgb(33, 37, 41)"
            : "white"
        }
        width="123px"
        height="42.3px"
        className={classes.logo}
      />
    </div>
  );
}

export default withTheme(Configure);
