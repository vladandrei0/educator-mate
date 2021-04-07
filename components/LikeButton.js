import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import * as colors from '../styles/colors'


export default function LikeButton({ userId, itemId, isLiked, updateStatus, useLikeKey }) {
    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation(updateStatus, {
        // When mutate is called:
        onMutate: async ({ itemId, liked }) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(useLikeKey)
            // Snapshot the previous value
            const previousLiked = queryClient.getQueryData(useLikeKey)
            // Optimistically update to the new value
            if (liked) {
                queryClient.setQueryData(useLikeKey, old => [...old, itemId])
            } else {
                const index = previousLiked.indexOf(itemId);
                let removed = previousLiked
                removed.splice(index, 1)
                queryClient.setQueryData(useLikeKey, removed)
            }
            // Return a context object with the snapshotted value
            return { previousLiked }
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newFisa, context) => {
            queryClient.setQueryData(useLikeKey, context.previousLiked)
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries(useLikeKey)
            // invalidate liked worksheets query 
            queryClient.invalidateQueries(['likedfise', userId])
            queryClient.invalidateQueries(['likedtemecucontent', userId])
        },
    })

    const handleLikeClick = (userId, itemId, isLiked) => {
        try {
            mutate({ userId, itemId, liked: !isLiked })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <button onClick={() => handleLikeClick(userId, itemId, isLiked)}
            disabled={isLoading} aria-label='like'
            style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                display: 'inline-block',
            }}>
            {isLiked
                ? <FavoriteOutlinedIcon style={{ color: `${colors.pink}` }} />
                : <FavoriteBorderIcon style={{ color: `${colors.pink}` }} />}
        </button>
    )

}
