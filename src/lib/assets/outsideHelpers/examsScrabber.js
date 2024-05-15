    // Uni Type Question Scrabber V3
    const collectionID = 'collection-6e6188cdf7f5d5c00ea4e4791d42ae2eaf34f43e'
    const examID = 'exam-41fd2f8b8d603ec8f8d'
    const questionCategoryID = 'category-e0c7ecbefb'


    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    function injectParagraphObj(txt, id){
        paragraphObj[`paragraph-${id}`] = {
            paragraphTitle: '',
            paragraphText: txt
        }
    }
    function injectQuestionObj(questionHead, questionAnswers, correctAnswer, orderInExam, paragraphID){
        questionObj[`question-${makeid(20)}`] = {
            tags: [],
            hidden: false,
            linkedCollections: {
            [collectionID]: {
                [examID]: orderInExam,
            }
            },
            questionCategoryID,
            questionParagraphID: paragraphID ? `paragraph-${paragraphID}` : '',
            questionHint: '',
            answerExplination: '',
            questionHead,
            questionAnswers,
            correctAnswer,
            lastUpdateDate: ''
        }
    }
    let paragraphObj = {}
    let questionObj = {}
    let randomID
    let k = 0
    document.querySelectorAll('.Qr7Oae > .OxAavc').forEach(elmntsContainer => {
        if(!elmntsContainer.previousElementSibling?.querySelector('.SajZGc.w0W4bd.tT7zXd.RVEQke') && !elmntsContainer.querySelector('.Eg06Ee > .hfh9V > .ujnDW > .docssharedWizToggleLabeledContainer.rnFeqc.LygNqb.N2RpBe.RDPZE > .bzfPab.wFGF8 > .uVccjd.aiSeRd.FXLARc.wGQFbe.BJHAP.NCCCpb.oLlshd.N2RpBe.RDPZE')){

            // Get Paragraph
            const isParagraph = elmntsContainer.classList.contains('NVbRL') ? true : false
            if(isParagraph){
                    const paragraphContainer = elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > .M7eMe ')
                    randomID = makeid(20)
                if(paragraphContainer){
                    injectParagraphObj(paragraphContainer.innerText, randomID)
                }
            } else {
                // Get Questions          	
                let fullQuestionStr
                let isQuestion = elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > span:nth-child(1)')
                if(isQuestion){
                    const questionContainer = elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > span')
                    fullQuestionStr = questionContainer.innerText
                }
                
                // Get Answers
                let j = 0
                let answersObj = {}
                const answersElmntContainer = elmntsContainer.querySelectorAll('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb')
                answersElmntContainer.forEach(answerTextElmntContainer =>{
                    const answerTextContainer = answerTextElmntContainer.querySelector('.docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')
                    answersObj[j] = answerTextContainer.innerText
                    j++
                })
                
                // Get Correct Answer
                let correctAnswer
                // Correct Answer position changes if it was answered correct or wrong
                const isAnsweredCorrectly = elmntsContainer.querySelector('.pYfr3c').classList.contains('LRmqmf')
                const isAnsweredIncorrectly = elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')
                
                if(isAnsweredCorrectly){
                    const correctAnswerContainer = elmntsContainer.querySelector('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb > .docssharedWizToggleLabeledContainer.O4MBef.LygNqb.N2RpBe.A1MUVb.tXA2Db.RDPZE > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')
                    correctAnswer = correctAnswerContainer.innerText

                }else if(isAnsweredIncorrectly) {
                    const correctAnswerContainer = elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')
                    correctAnswer = correctAnswerContainer.innerText
                }

                // inject question info info questionObj
                injectQuestionObj(fullQuestionStr, answersObj, correctAnswer, k, randomID)
                k++
            }
        }
    })





const cardBg = document.createElement('div')
cardBg.style = `
background-color: rgba(0, 0, 0, 0.5);
height: 100%;
width: 100%;
position: fixed;
top: 0;
left: 0;
z-index: 9999999999999999999999999;`
document.body.appendChild(cardBg)



const testareaStyle = `
width: 100%;
height: 100%;
border-radius: 5px;
color: rgb(189 87 17);`
const copyBtnStyle = `
width: 100%;
height: 40px;
border-radius: 5px;
border: 1px blue solid;
background: transparent;
color: blue;
cursor: pointer;`
const cardSideStyle = `
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
gap: 10px;`



const cardContainer = document.createElement('div')
cardContainer.style = `
height: 100%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
position: fixed;
top: 0;
left: 0;
z-index: 999999999999999999999999999;
font-family: "El Messiri", sans-serif;`
const card = document.createElement('div')
card.style = `
height: 90vh;
width: 80vw;
background-color: #fff;
border-radius: 20px;
display: flex;
justify-content: space-between;
padding: 20px;
gap: 20px;
color: rgb(121 58 21);`
const card1Side = document.createElement('div')
card1Side.style = cardSideStyle
const card1SideHeader = document.createElement('h2')
card1SideHeader.textContent = 'الاسئلة'


const card1SideTextarea = document.createElement('textarea')
card1SideTextarea.setAttribute('disabled', 'true')
card1SideTextarea.style = testareaStyle
const card1SideCopyBtn = document.createElement('button')
card1SideCopyBtn.innerHTML = 'Copy'
card1SideCopyBtn.style = copyBtnStyle



const card2Side = document.createElement('div')
card2Side.style = cardSideStyle
const card2SideHeader = document.createElement('h2')
card2SideHeader.textContent = 'القطع'

const card2SideTextarea = document.createElement('textarea')
card2SideTextarea.setAttribute('disabled', 'true')
card2SideTextarea.style = testareaStyle
const card2SideCopyBtn = document.createElement('button')
card2SideCopyBtn.innerHTML = 'Copy'
card2SideCopyBtn.style = copyBtnStyle


// Append to Body
card1Side.appendChild(card1SideHeader)
card1Side.appendChild(card1SideTextarea)
card1Side.appendChild(card1SideCopyBtn)
card.appendChild(card1Side)

card2Side.appendChild(card2SideHeader)
card2Side.appendChild(card2SideTextarea)
card2Side.appendChild(card2SideCopyBtn)
card.appendChild(card2Side)
cardContainer.appendChild(card)
document.body.innerHTML += `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@400..700&display=swap" rel="stylesheet">`
document.body.appendChild(cardContainer)


card1SideTextarea.textContent = JSON.stringify(questionObj, null, 2) + ','
card1SideCopyBtn.onclick = () => { navigator.clipboard.writeText(JSON.stringify(questionObj)) }
card2SideTextarea.textContent = JSON.stringify(paragraphObj, null, 2) + ','
card2SideCopyBtn.onclick = () => { navigator.clipboard.writeText(JSON.stringify(paragraphObj)) }