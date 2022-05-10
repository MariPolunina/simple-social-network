import React, { useEffect, useState } from "react";
import Style from './Pages.module.scss';

export default function Pages(props) {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        let examPages=getPagesSize(props.currentPage, props.totalCount, props.pageSize, props.infoHowToShow);
        if((pages[0]!=examPages[0]) || (pages[pages.length-1]!=examPages[examPages.length-1])){
            setPages(examPages);
        }
    } , [pages, props.totalCount]);

    const getPagesSize = (currentPage, totalCount, pageSize, infoHowToShow) => {
        let pagesCount = Math.ceil(totalCount / pageSize);
        let pages = [];
        let minSize = currentPage - infoHowToShow.decreaseIncrease <= 0 ? 1 : currentPage - infoHowToShow.decreaseIncrease;
        let max = minSize + infoHowToShow.sizePortion > pagesCount ? pagesCount : minSize + infoHowToShow.sizePortion;
        for (let i = minSize; i <= max; i++) {
            pages.push(i);
        }
        return pages;
    }

    const handleClickPage = (item) => {
        props.handlePageChange(item);
        const newPages = getPagesSize(item, props.totalCount, props.pageSize, props.infoHowToShow);
        setPages(newPages);
    }

    return (
        <ul className={Style.pageContainer}>
            <div className={Style.stringNumbers}>
                {pages.map(item => <li key={item} className={props.currentPage == item ? Style.chosing : Style.usualNumberPage} onClick={() => handleClickPage(item)}>{item}</li>)}
            </div>
        </ul>
    );
}