import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import MediaQuery from 'react-responsive';
import { GameProvider, GameContext } from '../contexts/GameContext';
import { ScrollProvider, ScrollContext } from '../contexts/ScrollContext';
import Brand from '../components/Brand';
import Streamer from '../components/Streamer';
import Header from '../components/Header';
import Transition from '../components/Transition';
import '../style/grid.sass';

const TemplateWrapper = ({children, data, location}) => {
    const siteName = 'jrcode';
    return <GameProvider>
        <GameContext.Consumer>
            {(gameProps) => (
                <Fragment>
                    <Helmet title={siteName} />
                    <ScrollProvider>
                        <ScrollContext.Consumer>
                            {({scrollDir, scrollY}) => {
                                return <MediaQuery maxWidth={760}>
                                    {(isSmall) => {
                                        return <div className={`grid-main${isSmall ? '-mini' : ''}`}>
                                            <Brand 
                                                siteName={siteName}
                                                isSmall={isSmall}
                                                {...gameProps}
                                            />
                                            <div className="grid-main-header">
                                                <Header 
                                                    siteName={siteName}
                                                    isSmall={isSmall}
                                                    location={location}
                                                    scrollDir={scrollDir}
                                                    scrollY={scrollY}
                                                    {...gameProps}
                                                />
                                            </div>
                                            <div className="grid-main-content">
                                                <Transition
                                                    actions={[scrollDir === 'up' || scrollY === 0 ? 'dip' : 'revert']}
                                                >
                                                    {children()}
                                                </Transition>
                                            </div>
                                        </div>
                                    }}
                                </MediaQuery>
                            }}
                        </ScrollContext.Consumer>
                    </ScrollProvider>
                </Fragment>
            )}
        </GameContext.Consumer>
    </GameProvider>
}

TemplateWrapper.propTypes = {
    children: PropTypes.func,
}

export default TemplateWrapper;