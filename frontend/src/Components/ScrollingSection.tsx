import styled, { keyframes, css } from 'styled-components';
import styles from '../Styles/ScrollingSection.module.scss';

function ScrollingSection(props:{"isUp": boolean, "carouselImages":string[], "animationDuration":string}) {
	const coverHeight = "33vw";
	const scroll = [
		keyframes`
			0% {
				top:0%;
			}

			100% { 
				top:calc(${coverHeight} * -1 * ${props.carouselImages.length});
			}
		`, 
		keyframes`
			0% {
				top: calc(${coverHeight} * ${props.carouselImages.length});
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
			<div className={styles.slider}>
				<ScrollDivPrimary className={styles["scroll-element"]} >
					{
						props.carouselImages.map( (img, i)=>
							(
								<div key={i}>
									<img src={img} />
								</div>
							)
						)
					}
				</ScrollDivPrimary>
				<ScrollDivSecondary className={styles["scroll-element"]} >
					{
						props.carouselImages.map( (img, i)=>
							(
								<div key={i}>
									<img src={img} />
								</div>
							)
						)
					}
				</ScrollDivSecondary>
			</div>
		
	)
}

export default ScrollingSection;
