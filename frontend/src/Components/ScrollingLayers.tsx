import styled, { keyframes, css } from 'styled-components';
import styles from '../Styles/ScrollingSection.module.css';
import { HiPlay } from 'react-icons/hi2';

function ScrollingSection(props:{"isUp": boolean, "carouselLayers":{"_id":string}[], "animationDuration":string, "width":string, "marginBottom":string, "onClick":Function}) {
	const scroll = [
		keyframes`
			0% {
				top:0%;
			}

			100% { 
				top:calc((${props.width} + ${props.marginBottom}) * -1 * ${props.carouselLayers.length});
			}
		`, 
		keyframes`
			0% {
				top: calc((${props.width} + ${props.marginBottom}) * ${props.carouselLayers.length});
			}

			100% {
				top: 0%;
			}
		`
	]
	const ScrollDivPrimary = styled.div`
		animation: ${scroll[0]} ${props.animationDuration} infinite ${props.isUp?"reverse":""} linear
	`
	const ScrollDivSecondary = styled.div`
		animation: ${scroll[1]} ${props.animationDuration} infinite ${props.isUp?"reverse":""} linear
	`
	return (
			<div className={styles.slider}style={{"width":props.width}}>
				<ScrollDivPrimary className={styles["scroll-element"]} style={{"width":props.width}} >
					{
						props.carouselLayers.map( (layer, i)=>
							(
								<div 
									className={styles["album-cover-wrapper"]}
									key={i} 
									style={{marginBottom:props.marginBottom}}
									onClick={()=>{props.onClick(layer["_id"])}}
								>
									<div className={styles["hover-overlay"]} >
										<i><HiPlay /></i>
									</div>
									<img src={"/api/layer/getCover/?coverid="+ layer["_id"]} />
								</div>
							)
						)
					}
				</ScrollDivPrimary>
				<ScrollDivSecondary className={styles["scroll-element"]} >
					{
						props.carouselLayers.map( (layer, i)=>
							(
								<div 
									className={styles["album-cover-wrapper"]}
									key={i} 
									style={{marginBottom:props.marginBottom}}
									onClick={()=>{props.onClick(layer["_id"])}}
								>
									<div className={styles["hover-overlay"]} >
										<i><HiPlay /></i>
									</div>

									<img src={"/api/layer/getCover/?coverid="+ layer["_id"]} />
								</div>
							)
						)
					}
				</ScrollDivSecondary>
			</div>
		
	)
}

export default ScrollingSection;
