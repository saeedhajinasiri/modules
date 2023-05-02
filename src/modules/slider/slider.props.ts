export interface SliderProps {
  children: any

  delay?: number

  spaceBetween?: number

  slides?: number

  infiniteLoop?: boolean

  pauseOnMouseOver?: boolean

  autoMove?: boolean

  indicator?: boolean

  indicatorActiveColor?: 'primary' | 'secondary' | 'tertiary' | "info" | 'success' | 'warning' | 'danger' | 'purple' | 'control'

  navigation?: boolean

  nextNavigation?: (onClick: any) => any

  prevNavigation?: (onClick: any) => any
}