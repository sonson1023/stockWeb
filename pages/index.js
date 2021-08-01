import Head from 'next/head'
import { useState, useEffect } from 'react';
import Select from 'react-select';
import dynamic from 'next/dynamic'
import dayjs from 'dayjs';
import { getHistoryData } from '../api/fetch';


export default function Home() {

  // const yahooFinance = require('yahoo-finance');
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]


  const DynamicComponentWithNoSSR = dynamic( () => import('react-apexcharts'),{ ssr: false } )
  const [history, setHistory] = useState({})
  const [ticker, setTicker] = useState('')
  const handleInput = async e => { 
    setTicker(e.target.value)
  }
  const setData = async (data) => {
    // state.series[0].data = [];
    var series = []
    setState({}b)
    console.log(`setData`)
   await data.forEach((obj, idx) => {
      series.push({
        x: obj.date,
        y:[obj.open, obj.high, obj.low, obj.close]
      })
      // state.series[0].data.push({
      //   x: obj.date,
      //   y:[obj.open, obj.high, obj.low, obj.close]
      // });
    })
    // setState({'series': series})
    setState({series:[{name:'candle',data:series}]})
    console.log(series)
  }
  
  const [state, setState] = useState(
    {
      series: [{
        name: 'candle',
        data: [
          {
            // Open, High, Low, Close
            x: new Date(1538778600000),
            y: [6629.81, 6650.5, 6623.04, 6633.33]
          },
          {
            x: new Date(1538780400000),
            y: [6632.01, 6643.59, 6620, 6630.11]
          }
        ]
      }], 
    }
  );
  const [opt, setOpt] = useState(
    { options: {
        chart: {
          height: 350,
          type: 'candlestick'
        },
        title: {
          text: 'CandleStick Chart - Cateogry X-axis',
          align: 'left'
        },
        annotations: {
          xaxis: [
            {
              x: 'Oct 06 14:00',
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  fontSize: '12px',
                  color: '#fff',
                  background: '#00E396'
                },
                orientation: 'horizontal',
                offsetY: 7,
                text: 'Annotation Test'
              }
            }
          ]
        }, tooltip: {
          enabled: true,
        }, xaxis: {
          type: 'category',
          labels: {
            formatter: function (val) {

              return dayjs(val).format('MMM DD HH:mm')
            }
          }
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }}
  )
  useEffect(() => {
    console.log(state)
    return () => {
      // cleanup
    }
  }, [])

  return (
    <div>
      <Head>
        <title>주식 시뮬레이터</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" />
      </Head>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
          </a>
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="" className="navbar-menu" >
          <div className="navbar-start">
            <a className="navbar-item">MACD</a>
            <a className="navbar-item">MACD시뮬레이터</a> 
          </div>
        </div> 
      </nav>

      <main>
        <container className="container">
          <section className="section">

            <div className="columns">
              <div className="column is-one-fifth">
                {/* <Select options={options} /> */}
                <div className="control">
                  <input className="input" type="text" placeholder="AAPL" value={ticker} onChange={handleInput} />
                  <button className="button" onClick={async () => {
                    const resp = await getHistoryData(ticker)
                    // setHistory(resp)
                    setData(resp)
                  }}>조회</button>

                </div>
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column is-half">
                <DynamicComponentWithNoSSR options={opt} series={state.series} type="candlestick" height={350} />
                <div id="chart">

                </div>
              </div>
            </div>
          </section>
        </container>
      </main>

      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
        </div>
      </footer>

    </div>
  )
}
