const start = document.getElementById("start")
const pause = document.getElementById("pause")
const lap = document.getElementById("lap")
const resume = document.getElementById("resume")
const reset = document.getElementById("reset")
const buttons = document.querySelectorAll(".btn")

const laps = document.querySelector(".laps")

const hour = document.getElementById("hour")
const min = document.getElementById("min")
const sec = document.getElementById("sec")
const msec = document.getElementById("msec")

let h=0, m=0, s=0, ms=0
let timer = null
let numLap = 1
let blh=blm=bls=blms=0

const align = (d) => {
				if (d<10) {
								return `0${d}`
				} else {
								return `${d}`
				}
}

const updateTimer = (h,m,s,ms) => {
				hour.textContent = align(h)
				min.textContent =align(m)
				sec.textContent = align(s)
				msec.textContent = align(ms)
}
updateTimer(0,0,0,0)


const toggleButtons = (st, pa, la, re, rt) => {
				buttons.forEach(btn => btn.classList.remove("active"))
				if (st) {
								start.classList.add("active")
				}
				if (pa) {
								pause.classList.add("active")
				}
				if (la) {
								lap.classList.add("active")
				}
				if (re) {
								resume.classList.add("active")
				}
				if (rt) {
								reset.classList.add("active")
				}
}



const startTimer = () => {
				console.log("started...")
				toggleButtons(0, 1, 1, 0, 0)
				timer = setInterval(() => {
								ms+=1
								if (ms===100) {
												ms=0
												s+=1
												if (s===60) {
																s=0
																m+=1
																if (m===60) {
																				m=0
																				h+=1
																}
												}
								}
								updateTimer(h,m,s,ms)
				}, 10)
}

const pauseTimer = () => {
				console.log("paused...")
				toggleButtons(0, 0, 0, 1, 1)
				clearInterval(timer)
}

const calcDif = () => {
				const ct = (h*3600+m*60+s)*100+ms
				const pt = (blh*3600+blm*60+bls)*100+blms
				let diff = ct - pt
				const msDiff = diff%100
				diff -= msDiff
			 diff /= 100
				const hDiff = Math.floor(diff/3600)
				diff -= hDiff*3600
				const mDiff = Math.floor(diff/60)
				diff -= mDiff * 60
				const sDiff = diff
				return `${align(hDiff)}:${align(mDiff)}:${align(sDiff)}:${align(msDiff)}`
}

const lapTimer = () => {
				console.log("lapped...")
				newItem = `<div>${numLap}</div>
								<div>${align(h)}:${align(m)}:${align(s)}:${align(ms)}</div>
								<div>${calcDif()}</div>`
				newTag = document.createElement("section")
				newTag.innerHTML = newItem
				blh = h
				blm = m
				bls = s
				blms = ms
				laps.appendChild(newTag)
				numLap++
}

const resumeTimer = () => {
				console.log("resumed...")
				toggleButtons(0, 1, 1, 0, 0)
				startTimer()
}

const resetTimer = () => {
				console.log("reset")
				toggleButtons(1, 0, 0, 0, 0)
				clearInterval(timer)
				h=m=s=ms=0
				updateTimer(h,m,s,ms)
				blh=blm=bls=blms=0
				numLap=1
				laps.innerHTML=""
}

test = setInterval(() => console.log(1), 1000)
setTimeout(() => clearInterval(test), 11000)
setTimeout(() => clearInterval(test), 12000)


// EventListeners
start.addEventListener("click", startTimer)
pause.addEventListener("click", pauseTimer)
lap.addEventListener("click", lapTimer)
resume.addEventListener("click", resumeTimer)
reset.addEventListener("click", resetTimer)
