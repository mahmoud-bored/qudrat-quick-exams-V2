export type RedisDB = {
    [key: string]: {
        version: number,
        timestamp: string
    }
}
export type DbData = {
    [key: string]: any;
    exam: {
        [exam_id: number]: {
            exam_name: string,
            exam_order: number,
            course_id: number,
            collection_id: number
        }
    };
    course: {
        [course_id: number]: {
            course_name: string,
            course_description: string,
        }
    };
    collection: {
        [collection_id: number]: {
            collection_name: string,
            collection_order: number,
            course_id: number
        }
    };
    answer: {
        [answer_id: number]: {
            answer_text: string,
            question_id: number,
            is_correct: boolean,
            course_id: number,
            answer_order: number
        }
    },
    category: {
        [category_id: number]: {
            category_name: string,
            category_type: string,
            course_id: number
        }
    };
    tag: {
        [tag_id: number]: {
            tag_text: string,
            tag_color: string,
            course_id: number,
        }
    };
    paragraph: {
        [paragraph_id: number]: {
            paragraph_text: string,
            paragraph_title: string | null,
            is_hidden: boolean,
            course_id: number,
        }
    };
    question: {
        [question_id: number]: {
            question_text: string,
            question_hint: string | null,
            question_answer_explination: string | null,
            is_hidden: boolean,
            catigory_id: number,
            paragraph_id: number | null,
            timestamp: string,
            course_id: number,
        }
    };
    question_exam: {
        [question_exam_id: number]: {
            question_id: number,
            exam_id: number,
            question_order: number,
            course_id: number,
        }
    };
    question_tag: {
        [question_tag_id: number]: {
            question_id: number,
            tag_id: number,
            course_id: number,
        }
    };
}
export interface CategoriesContainer {
    [categoryID: number]: {
        name: string,
        type: string,
    }
}
export interface ParagraphsContainer {
    [paragraphID: number]: Paragraph
}
export interface Paragraph {
    paragraphTitle: string | null,
    paragraphText: string,
}
export interface QuestionsContainer {
    [questionID: number]: Question
}
export interface QuestionAnswers {
    [answerID: number]: string
}
export interface Question {
    answerExplination: string | null,
    correctAnswer: string,
    lastUpdateDate: string,
    linkedCollections: {
        [collectionID: number]: {
            [examID: number]: number,
        }
    }
    questionAnswers: QuestionAnswers
    questionCategoryID: number,
    questionHead: string,
    questionHint: string | null,
    questionParagraphID: number | null,
    state: string, //=||>
    isQuestionMarked: boolean, //=||>
    skipState: boolean, //=||>
    correctState: boolean, //=||>
    incorrectState: boolean, //=||>
    pickedAnswer: string, //=||>
}

