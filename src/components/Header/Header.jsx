import css from './Header.module.css';

export const Header = () => {
    return (
        <header className={css.header}>
            <h1 className={css.title}>TASK:</h1>
            <h2 className={css.title}>Pair of employees who have worked together</h2>
        </header>
    );
};