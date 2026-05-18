import Link from "next/link";
import Image from 'next/image';
import css from "./Header.module.css"

export default function Header() {
    return (
        <header className={css.header}>
            <div className={css.container}>
                <Link href="/">
                    <Image                       
                        src="/logo.svg"                       
                        alt="RentalCar Logo"                      
                        width={102}                        
                        height={16}                        
                        priority                       
                    />
                </Link>
            
                <nav aria-label="Main Navigation">
                    <ul className={css.navigation}>
                        <li className={css.navigationItem}>                  
                            <Link href="/" className={css.navigationLink}>Home</Link>                        
                        </li>                    
                        <li className={css.navigationItem}>
                            <Link href="/catalog" className={css.navigationLink}>Catalog</Link>                             
                        </li>                        
                    </ul>                    
                </nav>                
            </div>
        </header>   
    )
}