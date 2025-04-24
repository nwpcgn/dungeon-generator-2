<script lang="ts">
	import { onMount } from 'svelte'
	let blockOne: HTMLDivElement
	let blockTwo: HTMLDivElement
	let a = { x: 0, y: 0, width: 0, height: 0 }
	let b = { x: 0, y: 0, width: 0, height: 0 }

	let resultText = ''
	let resultColors = {
		first: 'black',
		second: 'black',
		third: 'black',
		fourth: 'black'
	}

	function updateCoordinates() {
		a = getRect(blockOne)
		b = getRect(blockTwo)

		const first = a.y + a.height < b.y
		const second = a.y > b.y + b.height
		const third = a.x + a.width < b.x
		const fourth = a.x > b.x + b.width
		const collide = !isCollide(a, b)

		resultColors = {
			first: first ? 'green' : 'red',
			second: second ? 'green' : 'red',
			third: third ? 'green' : 'red',
			fourth: fourth ? 'green' : 'red'
		}
		resultText = '!' + collide
	}

	function getRect(el: HTMLElement) {
		const { top, left, width, height } = el.getBoundingClientRect()
		return { x: left, y: top, width, height }
	}

	function isCollide(a, b) {
		return !(
			a.y + a.height < b.y ||
			a.y > b.y + b.height ||
			a.x + a.width < b.x ||
			a.x > b.x + b.width
		)
	}

	function onDrag(e: MouseEvent, target: HTMLDivElement) {
		const shiftX = e.clientX - target.getBoundingClientRect().left
		const shiftY = e.clientY - target.getBoundingClientRect().top

		function moveAt(pageX: number, pageY: number) {
			target.style.left = `${pageX - shiftX}px`
			target.style.top = `${pageY - shiftY}px`
			updateCoordinates()
		}

		function onMouseMove(e: MouseEvent) {
			moveAt(e.pageX, e.pageY)
		}

		document.addEventListener('mousemove', onMouseMove)

		document.addEventListener(
			'mouseup',
			() => {
				document.removeEventListener('mousemove', onMouseMove)
			},
			{ once: true }
		)
	}

	onMount(() => {
		updateCoordinates()
	})
</script>

<div class="container">
	<div class="first_chapter"></div>
	||
	<div class="second_chapter"></div>
	||
	<div class="third_chapter"></div>
	||
	<div class="fourth_chapter"></div>
<!-- 	=
	<div class="result"></div>
	<div class="one block"></div>
	<div class="two block"></div> -->

	<div
		bind:this={blockOne}
		class="one block"
		style="left: 50px; top: 50px;"
		onmousedown={(e) => onDrag(e, blockOne)}>
		x: {a.x}<br />y: {a.y}<br />w: {a.width}<br />h: {a.height}
	</div>

	<div
		bind:this={blockTwo}
		class="two block"
		style="left: 200px; top: 150px;"
		onmousedown={(e) => onDrag(e, blockTwo)}>
		x: {b.x}<br />y: {b.y}<br />w: {b.width}<br />h: {b.height}
	</div>
</div>

<!-- <div class="first_chapter" style="color: {resultColors.first}">
	<span class="badge" class:badge-error={( a.y: {a.y} + a.h: {a.height} ) < ( b.y: {b.y} )}></span>
</div>
<div class="second_chapter" style="color: {resultColors.second}">
	( a.y: {a.y} > ( b.y: {b.y} + b.h: {b.height} ))
</div>
<p class="third_chapter" style="color: {resultColors.third}">
	(( a.x: {a.x} + a.w: {a.width} ) < b.x: {b.x} )
</p>
<p class="fourth_chapter" style="color: {resultColors.fourth}">
	( a.x: {a.x} > ( b.x: {b.x} + b.w: {b.width} ))
</p> -->
<p class="result">{resultText}</p>


<style>
	.block {
  height: 100px;
  width: 100px;
}
.one {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: lightblue;
}
.one:before {
  content: '= a =';
  display: block;
  text-align: center;
}
.two {
  position: absolute;
  top: 50px;
  right: 200px;
  background-color: lime;
}
.two:before {
  content: '= b =';
  display: block;
  text-align: center;
}
.current_target {
  color: red;
}

</style>