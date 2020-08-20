import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.

interface Props {
    updateQuiz: any;
}

function validateQuestion(value: any) {
    let error;
    if (value == '') {
        error = 'You must write a question!';
    }
    return error;
}

function checkForDuplicates(array:any) {
    return new Set(array).size !== array.length
}

function validateOption(value: any) {
    let error;
    if (value == '') {
        error = 'Nice try!';
    }
    return error;
}

const OptionList: React.FC<Props> = (props) => {

    const [questionCount, setquestionCount] = useState(0);

    function validateUsername(value: any) {
        let error;
        if (value === 'admin') {
            error = 'Nice try!';
        }
        return error;
    }

    return (<div>
        <h1>Option List</h1>
        <Formik
            initialValues={{question: '', options: [],timer:'15'}}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {

                    props.updateQuiz(values);
                    //   alert(JSON.stringify(values, null, 2));
                }, 400);
            }}
            render={({values, validateField, errors}) => (
                <Form>
                    <Field name="question"
                           validate={validateQuestion}
                    >
                    </Field>
                    <FieldArray
                        name="options"
                        render={arrayHelpers => (
                            <div>
                                {values.options && values.options.length > 0 ? (
                                    values.options.map((option, index) => (
                                        <div key={index}>
                                            <Field name={`options.${index}`}/>
                                            <button
                                                type="button"
                                                onClick={() => (arrayHelpers.remove(index), setquestionCount(questionCount + 1))}
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => (arrayHelpers.insert(index + 1, ''), setquestionCount(questionCount + 1))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button type="button"
                                            onClick={() => (arrayHelpers.push(''), setquestionCount(questionCount + 1))}>
                                        Add an option
                                    </button>
                                )}
                                <div>
                                    <Field name="timer" as="select" placeholder="Select a time">
                                        <option value="15">15s</option>
                                        <option value="30">30s</option>
                                        <option value="45" >45s</option>
                                        <option value="60">1min</option>
                                    </Field>
                                </div>

                                        {errors.question ? <div>{errors.question}</div> : null}
                                        {questionCount < 2 ? <div>please write at least 2 questions</div> : null}
                                {checkForDuplicates(values.options)?<div>All answers must be different</div> : null}

                                        <div>
                                            <button type="submit"
                                                    disabled={(errors.question||questionCount < 2||checkForDuplicates(values.options))?true:false}
                                                    onClick={() => validateField('question')}
                                            >Submit
                                            </button>
                                        </div>
                                    </div>
                                    )}
                                    />
                                </Form>
                                )}
                                />
                            </div>)
                        };

                    export default OptionList;
