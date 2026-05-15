import React, { useState } from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
export default function Course({ course,openDialog }) {

    const  navigate = useNavigate();


    const { title, img, price } = course

    //Change course background based on Cur
    const [courseBg, setCourseBg] = useState();

 
    const handleCourseDetails = () => {
        navigate('/hadith-details'); // Use navigate to navigate to '/course-details'
    };

    return (
        <li className='card mb-2' style={{ width: "350px" , cursor:"pointer"}} onClick={handleCourseDetails}>
            <div className={`card-header ${courseBg}`}>{title}</div>
            <img src={img} alt='course img' style={{ height: "100%" }} />
            <p className='card-body'>
            Become a Master in Development with just ONE course.
            </p>
            <div className={`card-footer ${courseBg} d-flex justify-content-between`}>
                {/* <h4>{contextPrice}</h4> */}
                <Button  btnClass={"btn-success"} text={"Read"} onClick={openDialog} />
            </div>
        </li>
    )
}
