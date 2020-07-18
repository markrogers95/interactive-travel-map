import React from 'react';

const LogEntryForm = () => {
    
    return (
        <form className="entry-form">
            <label htmlFor="title">Title: </label>
            <input name="title" required/>
            <label htmlFor="comments">Comments: </label>
            <textarea name="comments" rows={3}></textarea>
            <label htmlFor="description">Description </label>
            <textarea name="description" rows={3}></textarea>
            <label htmlFor="image">Image</label>
            <input name="image"/>
            <label htmlFor="visitDate">Visit Date:</label>
            <input name="visitDate" type="date"/>
            <button>Create entry!</button>
        </form>
    );
};

export default LogEntryForm;