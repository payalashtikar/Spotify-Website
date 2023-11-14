import React from 'react'
import { Icon } from '@iconify/react';

const Nav = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '25px', height: '10vh', }}>
                <Icon icon="logos:spotify" width='100px' style={{ margin: '10px' }} />
                <div style={{ width: '100%', border: '1px solid lightgray' }}></div>
            </div>
        </>
    )
}

export default Nav