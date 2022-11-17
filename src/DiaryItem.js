const DiaryItem=({author, content, created_date, emotion, id})=>{
    let time=new Date(created_date).toLocaleString();
    return(
        <div className="DiaryItem">
            <div className="info">
                <span>작성자: {author} | 감정 : {emotion} </span>
                <br/>
                <span className="date">
                    {time}
                </span>
            </div>
            <div className="content">{content}</div>
        </div>
    )
};

export default DiaryItem;
//toLocaleString() 데이트 안에있는 메서드! 꼭 ()을 사용해 주자 