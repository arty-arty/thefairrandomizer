import "./HexLoader.scss"

export const HexLoader = ({ timeLeft }) => {
    return (<main class="main container">
        <div class="col col--full">
            {timeLeft > 10 ? "Waiting for future block seed" : "Sending proof tran -saction"}
            <br />
            ~{timeLeft} sec
            <div class="loader">

                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
            </div>
        </div>
    </main>)
}