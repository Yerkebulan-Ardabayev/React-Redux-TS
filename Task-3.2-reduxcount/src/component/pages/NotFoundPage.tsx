import { FC } from "react";
import {Link} from "react-router-dom";

const NotFoundPage: FC<{}> = () => {
    return (
        <div>
           This Page doesn't exist!! Go to <Link to="/">Home</Link>
        </div>
    )
}

export {NotFoundPage}