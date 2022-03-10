import { Dialog, Typography, Button } from "@material-ui/core";
import classes from "./ssWarning.module.css";

export default function ffWarning({ close }) {
  const navigateToMedium = () => {
    window.open("https://medium.com/@Bilidly/introducing-bilidly-exchange-bringing-the-ultimate-amm-model-to-binance-smart-chain-6dd5eaa1564b", "_blank");
  };

  return (
    <Dialog fullScreen open={true} onClose={close} className={classes.dialogWrapper}>
      <div className={classes.dialogContainer}>
        <div className={classes.warningContainer}>
          <img src="/images/icon-warning.svg" className={classes.warningIcon} />
          <Typography className={classes.title1}>Bilidly Disclaimer:</Typography>
          <Typography className={classes.title2}>Acknowledgement of Terms &amp; Conditions of access</Typography>
          <Typography className={classes.paragraph} align="center">
            <span>
            Use of the Bilidly.exchange website, services, dapp, or application is subject to the following terms and conditions and I hereby confirm that by proceeding and interacting with the protocol I am aware of these and accept them in full:
            </span>
            <br /><br />
            Bilidly.exchange is a smart contract protocol forked from Andre Cronje's Solidly code, which is still in early stage. Modifications have been made on the smart contracts which haven't been audited.
            <br /><br />
            Any interactions that I have with the associated Bilidly protocol apps, smart contracts or any related functions may place my funds at risk, and I hereby release the Bilidly protocol and its contributors, team members, and service providers from any and all liability associated with my use of the above-mentioned functions.
            <br /><br />
            I am lawfully permitted to access this site and use the Bilidly.exchange application functions, and I am not in contravention of any laws governing my jurisdiction of residence or citizenship.
          </Typography>
          <div className={classes.buttonsContainer}>
            <Button fullWidth variant="contained" size="large" className={classes.primaryButton} onClick={close}>
              <Typography className={classes.buttonTextPrimary}>I understand the risks involved, proceed to the app</Typography>
            </Button>
            <Button fullWidth variant="contained" size="large" className={classes.secondaryButton} onClick={navigateToMedium}>
              <Typography className={classes.buttonTextSecondary}>Read more about Bilidly</Typography>
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
