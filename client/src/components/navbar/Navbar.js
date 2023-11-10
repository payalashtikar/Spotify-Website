import React from 'react'
import { Icon, calculateSize } from '@iconify/react';

const Navbar = () => {
    return (
        <div style={{width:'100%'}}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{display:'flex',justifyContent:'space-between',padding:'5px 20px',flexWrap:'wrap'}}>
                    <Icon icon="logos:spotify" width='100px' style={{ margin: '10px' }} />
                    <form class="form-inline my-2 my-lg-0" style={{ display: 'flex',}}>
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{margin:'0px 5px'}}/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
            </nav>
        </div>
    )
}

export default Navbar