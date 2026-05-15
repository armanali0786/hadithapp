import React, { useState } from 'react'
import Courses from './component/Courses'
// DB
import { HadithDb } from '../data/HadithDb'

export default function Store() {
    return (
        <>
        
            <div className='container'>
                <Courses list={HadithDb} />
            </div>
        </>
    )
}
