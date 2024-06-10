import React, { FC } from "react";

interface QuestionHeaderImage{
    image: string | undefined
}
export const QuestionHeaderImage:FC<QuestionHeaderImage> = ({image}) => {

    return (
        <>
            {(image !== '' && image)
                ? <div className="question_title_kolontitul">
                        <div className="kolontitul_image">
                            <img alt="no_image" src={image}/>
                        </div>
                  </div>
                : <></>}
        </>
    );
}