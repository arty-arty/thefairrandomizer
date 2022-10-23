/* tslint:disable */
import { FunctionComponent, useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { Button, Descriptions } from "antd";
import styles from "./RandomGenerator.module.css";
import axios from 'axios';
import TextParagraph from "./TextParagraph";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import useCountDown from 'react-countdown-hook';
import { textDecoration } from "@chakra-ui/react";
import { HexLoader } from "./HexLoader";


const waitingTime = 30 * 1000; // initial time in milliseconds
const interval = 1000; // interval to change remaining time amount

type RandomGeneratorType = {
  min?: string;
  max?: string;
};

type RandData = {
  randNumber?: string;
  txId?: string;
  txUrl?: string;
};

const PrettyPrintJson = ({ data }) => (<div><pre>{
  JSON.stringify(data, null, 2)}</pre></div>);

export const TechnicalData = ({ currentRound, randData, pk, timeLeft }) => {
  if (randData == null) return null;
  if (!currentRound) return null;

  const jsonData = {
    "blockSeedTakenFromBlockWithId": currentRound + 5,
    "publicKey": pk,
    "randNumber": randData?.randNumber,
  }

  return (
    <div>
      {/* {timeLeft != 0 ? <div><RotatingLines
        strokeColor="#003A8C"
        strokeWidth="5"
        animationDuration="1.0"
        width="45"
        visible={true}
        
      />~{timeLeft / 1000} sec</div> : null} */}
      {/* <ReactJson src={jsonData} /> */}
      {/* <PrettyPrintJson {...{data: jsonData }} /> */}
      <table>
        <tr>
          <th>Future block</th>
          <td>{currentRound + 8}</td>
        </tr>
        <tr>
          <th>Public key</th>
          <td>{pk}</td>
        </tr>
        {/* {randData?.randNumber ? <tr>
          <th>Result</th>
          <td>{randData?.randNumber}</td>
        </tr> : null} */}
        {randData.txId ? <tr>
          <th>Transaction</th>
          <td><a href={randData.txUrl} style={{ textDecoration: "underline" }} target={"_blank"}>{randData.txId}</a></td>
        </tr> : null}
      </table>
      {/* {currentRound ? "Current block: " + currentRound : null}
      <br />
      Block seed is taken from block with id: {currentRound ? currentRound + 3 : null} (3 blocks in the future)
      < br />
      Public key: {pk}
      <br /> */}
      <br />
      {timeLeft > 15000 ? <a href="https://testnet.algoexplorer.io/blocks" style={{ textDecoration: "underline" }} target={"_blank"} >Wait for future block {currentRound + 8}, after you click here.</a> : null}
      {timeLeft > 15000 ? " If the block already was there, your results have been tampered." : null}
      <br />
      {randData?.randNumber || timeLeft < 15000 ? "Click on transaction proof, once its available. If future block id or public key has changed, your results have been tampered." : null}
      <br />
      <br />
      {randData?.randNumber ? "Result: " + parseInt(randData.randNumber, 10) : null}
      <br />

    </div>)
}
//@ts-ignore
const RandomGenerator: FunctionComponent<RandomGeneratorType> = ({
  min,
  max,
}) => {
  const [currentRound, setCurrentRound] = useState(null);
  const [loading, setLoading] = useState(false);
  const [randData, setRandData] = useState<RandData>({});
  const [pk, setPk] = useState(null);

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(waitingTime + 10000, interval);
  useEffect(() => {
  }, []);

  const getRandom = async ({ pk, start }: { pk: String, start: Function }) => {
    if (!pk) { setLoading(false); return; }//clear spinning wheel

    const randData = await axios({
      method: 'post',
      url: 'https://api.algotool.app/random/proofOfRandom',
      timeout: 60000, // only wait for 60s
      data: { pk }
    }).catch(() => { setLoading(false); }) || { data: null }
    const data = randData?.data
    console.log("Got data", { data })
    setRandData(data);
    setLoading(false);
  }

  const clicked = async ({ start }) => {
    //fetch current round from backend by submitting zero
    //or better from algod
    setRandData({});
    const roundData = await axios.get("https://api.algotool.app/random/publicKey")
    const firstRound = roundData?.data?.firstRound;
    console.log(currentRound);
    if (firstRound) { setCurrentRound(firstRound); setLoading(true); start(); }
    const pkData = roundData
    console.log(pkData.data)
    const pk = pkData.data.pk
    setPk(pk);
    setTimeout(async () => { await getRandom({ pk, start }) }, waitingTime)
  }

  return (
    <div className={styles.component2Div}>
      <b className={styles.randomNumbersGenerator}>Random Numbers Generator</b>
      <div className={styles.frameDiv}>
        <div className={styles.minDiv}>
          <div className={styles.minDiv}>
            <div className={styles.maxDiv}>Min:</div>
            <div className={styles.inputNumberDiv}>
              <div className={styles.inputDiv}>
                <div className={styles.inputDiv1}>{min}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.minDiv}>
          <div className={styles.minDiv}>
            <div className={styles.maxDiv}>Max:</div>
            <div className={styles.inputNumberDiv}>
              <div className={styles.inputDiv}>
                <div className={styles.inputDiv1}>{max}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sliderDiv}>
        <div className={styles.trackDiv}>
          <div className={styles.minDiv3}>
            <div className={styles.ignoreDiv} />
            <div className={styles.ignoreDiv} />
          </div>
          <div className={styles.sliderDiv1}>
            <div className={styles.ignoreDiv}>
              <div className={styles.componentsHandleDiv}>
                <img className={styles.ignoreDiv} alt="" src="../handle.svg" />
              </div>
            </div>
            <div className={styles.ignoreDiv}>
              <div className={styles.componentsHandleDiv}>
                <img className={styles.ignoreDiv} alt="" src="../handle1.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? null : <Button type="default" size="middle" shape="round" onClick={async () => { await clicked({ start }) }}>
        Generate
      </Button>}
      <TechnicalData {...{ currentRound, randData, pk, timeLeft }}></TechnicalData>
      {timeLeft != 0 ? <HexLoader timeLeft={timeLeft / 1000} /> : null}
    </div>
  );
};

const ResultBlock = () => {

}

export default RandomGenerator;


{/* <InfinitySpin
  width='200'
  color="#003A8C"
/>  */}