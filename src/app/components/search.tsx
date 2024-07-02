import React, {useState} from 'react';

const TXT= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab beatae consectetur cupiditate deleniti harum impedit quas quisquam sed voluptate?"
const Search = () => {
    const [search, setSearch ] = useState('');
    return (
        <div>
            <input
                type="text"
                onChange={e => setSearch(e.target.value)}
                value={search}
                placeholder="Search text..."
            />
            <p>
                {search ? (
                    TXT.split(new RegExp(`(${search})`, 'gi')).map((part, index) =>
                        index % 2 === 1 ? (
                            <mark key={index}>{part}</mark>
                        ) : (
                            <span key={index}>{part}</span>
                        )
                    )
                ) : (
                    TXT
                )}
            </p>
        </div>
    );
};

export default Search;