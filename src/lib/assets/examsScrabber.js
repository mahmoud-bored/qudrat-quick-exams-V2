// EXAM PASS
document.querySelectorAll('.bzfPab.wFGF8').forEach(elmnt=>{
    elmnt.click()
})






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
    state: 'shared',
    linkedCollections: {
      [collectionID]: {
        [examID]: orderInExam,
      }
    },
    questionCategoryID,
    questionParagraphID: paragraphID ? paragraphID : '',
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
      }else{
        
        
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
        
        let correctAnswer
        // Get Correct Answer
        // Correct Answer position changes if it was answered correct or wrong
        const isAnsweredCorrectly = elmntsContainer.querySelector('.pYfr3c').classList.contains('LRmqmf')
        const isAnsweredIncorrectly = elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')
        
        if(isAnsweredCorrectly){
          const correctAnswerContainer = elmntsContainer.querySelector('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb > .docssharedWizToggleLabeledContainer.O4MBef.LygNqb.N2RpBe.A1MUVb.tXA2Db.RDPZE > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')
          
          correctAnswer = correctAnswerContainer.innerText
        }else if(isAnsweredIncorrectly){
          const correctAnswerContainer = elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')
          
          correctAnswer = correctAnswerContainer.innerText
        }
        
        
        // inject question info info questionObj
        injectQuestionObj(fullQuestionStr, answersObj, correctAnswer, k, randomID)
        k++
      }
		}
})
console.log(JSON.stringify(paragraphObj, null, 2) + ',')
console.log(JSON.stringify(questionObj, null, 2) + ',')
