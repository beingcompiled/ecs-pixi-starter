import Transform from '~/component/Transform'
import Motion from '~/component/Motion'
import Display from '~/component/Display'

const MotionNode = Ash.Node.create({
	transform: Transform,
	motion: Motion,
	display: Display
})

export default MotionNode
