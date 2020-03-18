import React, { useEffect, useContext } from 'react'
import { useRouteMatch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import * as AuthSelectors from 'redux/auth/selectors'

import { Grid, Box, Typography } from '@material-ui/core'

import EventHeroImage from 'components/events/EventHeroImage'
import Markdown from 'components/generic/Markdown'
import AnalyticsService from 'services/analytics'

import EventTimeline from './EventTimeline'
import EventButtons from './EventButtons'

import StaggeredList from 'components/animated/StaggeredList'
import StaggeredListItem from 'components/animated/StaggeredListItem'
import FadeInWrapper from 'components/animated/FadeInWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'
import Button from 'components/generic/Button'

import { EventStatuses } from '@hackjunction/shared'

import EventDetailContext from '../context'

export default () => {
    const dispatch = useDispatch()
    const { slug, event, registration } = useContext(EventDetailContext)
    useEffect(() => {
        if (slug) {
            AnalyticsService.events.VIEW_EVENT(slug)
        }
    }, [slug])
    const match = useRouteMatch()
    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const hasRegistration = !!registration

    // TODO shares duplicate code with Eventbuttons, normalize somehow
    const CallToAction = () => {
        if (EventStatuses.REGISTRATION_OPEN.id) {
            if (isAuthenticated) {
                if (hasRegistration) {
                    return (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={() =>
                                        dispatch(push(`${match.url}/register`))
                                    }
                                    variant="contained"
                                    color="theme_turquoise"
                                >
                                    Edit your registration
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={() =>
                                        dispatch(
                                            push(`/dashboard/${event.slug}`)
                                        )
                                    }
                                    variant="contained"
                                    color="theme_orange"
                                >
                                    Event dashboard
                                </Button>
                            </Grid>
                        </Grid>
                    )
                } else {
                    return (
                        <Button
                            fullWidth
                            onClick={() =>
                                dispatch(push(`${match.url}/register`))
                            }
                            variant="contained"
                            color="theme_turquoise"
                        >
                            Register now
                        </Button>
                    )
                }
            } else {
                return (
                    <Button
                        fullWidth
                        onClick={() =>
                            dispatch(push(`/login`, { nextRoute: match.url }))
                        }
                        variant="contained"
                        color="theme_turquoise"
                    >
                        Log in to register
                    </Button>
                )
            }
        } else {
            if (isAuthenticated) {
                if (hasRegistration) {
                    return (
                        <Button
                            fullWidth
                            onClick={() =>
                                dispatch(push(`/dashboard/${event.slug}`))
                            }
                            variant="contained"
                            color="theme_turquoise"
                        >
                            Event dashboard
                        </Button>
                    )
                } else {
                    return (
                        <Typography variant="subtitle1" align="center">
                            The application period for this event has ended!
                        </Typography>
                    )
                }
            } else {
                return (
                    <Button
                        fullWidth
                        onClick={() =>
                            dispatch(push('/login', { nextRoute: match.url }))
                        }
                        variant="contained"
                        color="theme_turquoise"
                    >
                        Log in
                    </Button>
                )
            }
        }
    }
    return (
        <>
            <EventHeroImage event={event} onBack={() => dispatch(push('/'))} />
            <FadeInWrapper>
                <CenteredContainer>
                    <StaggeredList>
                        <Grid container spacing={5} wrap="wrap-reverse">
                            <Grid item xs={12} md={8}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <Markdown source={event?.description} />
                                    <CallToAction />
                                </StaggeredListItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <EventButtons
                                        event={event}
                                        registration={registration}
                                    />
                                    <Box mt={3} />
                                    <EventTimeline event={event} />
                                </StaggeredListItem>
                            </Grid>
                        </Grid>
                    </StaggeredList>
                </CenteredContainer>
            </FadeInWrapper>
        </>
    )
}
