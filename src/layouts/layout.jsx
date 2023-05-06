
export function GridLayout(props) {
    return (
        <div style={{
            display: 'grid',
            height: `${props.height}`,
            gap: `${props?.gap ?? 2}rem`,
            gridTemplateColumns: `repeat(${props.columns},${props?.size ?? '1fr'})`,
            gridAutoRows: `${props?.rows + 'rem' ?? 'auto'}`
        }}>
            {props.children}
        </div>
    );
}
