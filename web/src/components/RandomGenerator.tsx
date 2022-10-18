/* tslint:disable */
import { FunctionComponent, useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { Button } from "antd";
import styles from "./RandomGenerator.module.css";
import axios from 'axios';
import TextParagraph from "./TextParagraph";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ColorRing, InfinitySpin, RotatingLines } from 'react-loader-spinner'
import useCountDown from 'react-countdown-hook';

const waitingTime = 11 * 1000; // initial time in milliseconds, defaults to 60000
const interval = 1000; // interval to change remaining time amount, defaults to 1000

type RandomGeneratorType = {
  min?: string;
  max?: string;
};

type RandData = {
  randNumber?: string;
  txId?: string;
  txUrl?: string;
};

const TechnicalData = ({ currentRound, randData, pk, timeLeft }) => {
  if (randData == null) return null;


  return (
    <div>
      {timeLeft != 0 ? <div><RotatingLines
        strokeColor="#003A8C"
        strokeWidth="5"
        animationDuration="1.0"
        width="45"
        visible={true}
      />~{timeLeft / 1000} sec</div> : null}
      {currentRound ? "Current block: " + currentRound : null}
      <br />
      Seed will be taken 3 blocks later
      < br />
      Public key: {pk}
      <br />
      {randData?.randNumber ? "Result: " + parseInt(randData.randNumber, 10) : null}
      <br />
      {randData.txId ? <a href={randData.txUrl}>Transaction: {randData.txId}</a> : null}
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

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(waitingTime + 7000, interval);
  useEffect(() => {
  }, []);

  const getRandom = async ({ pk, start }: { pk: String, start: Function }) => {
    if (!pk) { setLoading(false); return; }//clear spinning wheel

    const randData = await axios({
      method: 'post',
      url: 'http://localhost:4000/proofOfRandom',
      timeout: 10000, // only wait for 2s
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
    const roundData = await axios.get("http://localhost:4000/publicKey")
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
      <b className={styles.randomNumbersGenerator}>Random numbers generator</b>
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


    </div>
  );
};

const ResultBlock = () => {

}

export default RandomGenerator;
module.exports = { RandomGenerator, TechnicalData }

{/* <InfinitySpin
  width='200'
  color="#003A8C"
/>  */}