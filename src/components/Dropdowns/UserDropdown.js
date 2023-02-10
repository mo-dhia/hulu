import React from 'react'

export default function DropDown({ setUser, setEditModal }) {
    return (
        <div id='dropdown'>
            <div className='box param'
                onClick={() => setEditModal(true)}>
                <div className='txt'>
                    edit profile
                </div>
            </div>

            <div className='box out'
                onClick={() => {
                    setUser(null);
                    localStorage.removeItem('user');
                }}>
                <div className='txt'>
                    sign out
                </div>
            </div>
        </div>
    )
}
