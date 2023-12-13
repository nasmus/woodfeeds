import { AddRounded, RemoveRounded } from '@mui/icons-material';
import { useState } from 'react';

export default function Accordion({ title, icon, children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='px-2' >
            <div className="flex">
                {/* Accordion header */}
                <div className={isOpen ? 'text-black' : 'text-slate-400'}>{icon}</div>
                <button
                    className="w-full flex items-center justify-between p-1  rounded-md focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span
                        className={`text-sm font-medium ${
                            isOpen ? 'text-black' : 'text-slate-400'
                        } `}
                    >
                        {title}
                    </span>

                    {isOpen ? (
                        <RemoveRounded fontSize="small" className="text-slate-500" />
                    ) : (
                        <AddRounded fontSize="small" className="text-slate-500" />
                    )}
                </button>
            </div>
            {/* Accordion content */}
            <div
                className={`pl-2 transition-all overflow-hidden ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                }  rounded-md `}
            >
                {children}
            </div>
        </div>
    );
}
