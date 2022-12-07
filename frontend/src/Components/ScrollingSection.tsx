
import styles from '../Styles/ScrollingSection.module.scss';

function ScrollingSection(props:{"sectionHeader": string, "direction": string, "carouselImages":string[], "animationDuration":string}) {
	return (
			<div className={styles.slider} style={{"animationDuration":props.animationDuration}}>
				<div className={styles[props.direction + "-primary"] + " " + styles["scroll-element"]}>
					{
						props.carouselImages.map( (img, i)=>
							(
								<div key={i}>
									<img src={img} />
								</div>
							)
						)
					}
				</div>
				<div className={styles[props.direction + "-secondary"] + " " + styles["scroll-element"]}>
					{
						props.carouselImages.map( (img, i)=>
							(
								<div key={i}>
									<img src={img} />
								</div>
							)
						)
					}
				</div>
			</div>
		
	)
}

export default ScrollingSection;
