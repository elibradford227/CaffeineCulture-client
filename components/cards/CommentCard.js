/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteComment } from '../../utils/data/commentData';
import CommentForm from '../CommentForm';

export default function CommentCard({
  commentObj, onEditClick, user, setChange, getPostDetails, postId,
}) {
  const deleteThisComment = async () => {
    if (window.confirm('Delete comment?')) {
      await deleteComment(commentObj.id);
      setChange((prevState) => !prevState);
    }
  };

  const [form, setForm] = useState(false);

  const handleForm = () => {
    setForm((prevState) => !prevState);
  };

  return (
    <>
      <Card className={commentObj.parent !== null ? 'reply-card' : 'comment-card'}>
        <Card.Body>
          <Card.Title>{commentObj.title}</Card.Title>
          <hr />
          <Link passHref href={`/profile/${commentObj.user?.username}`}>
            <p className="username">{commentObj.user?.username}</p>
          </Link>
          {commentObj.parent !== null ? (
            <div>@{commentObj.parent?.user?.username}</div>
          ) : ''}
          <p>{commentObj.content}</p>
          <hr />
          <span style={{
            display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1em',
          }}
          >
            {user.uid === commentObj.user?.uid ? (
              <>
                <div>
                  {/* <Button onClick={onEditClick}>Edit</Button> */}
                  <FontAwesomeIcon icon={faPenToSquare} className="fa-icon" onClick={onEditClick} style={{ marginRight: '10px' }} />
                </div>
                <div>
                  {/* <Button variant="danger" onClick={deleteThisComment}>Delete</Button> */}
                  <FontAwesomeIcon icon={faTrashCan} className="fa-icon" onClick={deleteThisComment} style={{ marginRight: '10px' }} />
                </div>
              </>
            ) : '' }
            <Button className="signout-btn" variant="secondary" onClick={handleForm}>Reply</Button>
          </span>
        </Card.Body>
        {form ? (
          <CommentForm replyId={commentObj.id} getPostDetails={getPostDetails} postId={postId} handleForm={handleForm} />
        ) : ' '}
      </Card>
    </>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
      uid: PropTypes.string,
    }),
  }).isRequired,
  onEditClick: PropTypes.func,
  setChange: PropTypes.func.isRequired,
};

CommentCard.defaultProps = {
  onEditClick: () => {},
};
