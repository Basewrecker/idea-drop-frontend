import type {Idea} from "@/types";
import { Link } from "@tanstack/react-router";
import clsx from 'clsx';


const IdeaCard = ({idea, button = true }:{idea: Idea, button?: boolean}) => {

    const linkClasses = clsx({
        'text-blue-600 hover:underline mt-3' : !button,
        'text-blue-400': button
    })
    return (
        <div
              
              className="border border-gray-300 rounded-lg shadow p-4 bg-white"
            >
              <h3 className="text-lg font-bold text-gray-900">{idea.title}</h3>
              <p className="text-gray-600 mt-1">{idea.summary}</p>
              <Link to = "/ideas/$ideaId" params={{ideaId: idea.id.toString()}} className={linkClasses}>
              {button ? 'View Idea' : 'Read More -'}
              </Link>
            </div>
    );
}

export default IdeaCard;