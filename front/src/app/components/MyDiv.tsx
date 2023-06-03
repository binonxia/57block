import CSS from 'csstype';
import { forwardRef, LegacyRef, memo} from 'react';

interface IMyDivProps {
    styles: any,
    children?: any,
    id?: string,
    position?: string
}

const MyDiv: React.FC<IMyDivProps> = memo(forwardRef((props: IMyDivProps, ref: LegacyRef<HTMLDivElement>) => {
    const {styles, children, id, position, ...restProps} = props
    const basicStyle = {
        display: 'flex',
        justifyContent: 'center',
        border: 'solid 1px lightgray',
        ...styles
    }
    return (
        <div ref={ref} data-id={id} data-position={position} style={basicStyle} {...restProps}>
            {props.children}
        </div>
    );
}))

export default MyDiv