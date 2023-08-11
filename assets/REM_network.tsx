import React, { FunctionComponent } from 'react';
import Svg, { Circle, Rect, Text, TSpan } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

interface Props {
  RIVNumber?: any;
  RIVColor?: any;
  RIVOnPress?: any;
  DUQNumber?: any;
  DUQColor?: any;
  DUQOnPress?: any;
  PANNumber?: any;
  PANColor?: any;
  PANOnPress?: any;
  IDSNumber?: any;
  IDSColor?: any;
  IDSOnPress?: any;
  GCTNumber?: any;
  GCTColor?: any;
  GCTOnPress?: any;
  MSFNumber?: any;
  MSFColor?: any;
  MSFOnPress?: any;
  PCCNumber?: any;
  PCCColor?: any;
  PCCOnPress?: any;
  PCCRNumber?: any;
  PCCRColor?: any;
  PCCROnPress?: any;
}

const REM_Network: FunctionComponent<Props> = (props) => {
  return (  
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    id="enoQ81Dji3M1"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    viewBox="0 0 700 600"
  >
    <Circle
      r={35}
      fill="#82bf00"
      strokeWidth={0}
      transform="translate(120.823 123.615)"
    />
    <Circle
      r={35}
      fill="#82bf00"
      strokeWidth={0}
      transform="translate(476.385 479.177)"
    />
    <Rect
      width={70}
      height={354.55}
      fill="#82bf00"
      strokeWidth={0}
      rx={0}
      ry={0}
      transform="rotate(-45 227.128 -41.79) scale(1 1.41825)"
    />
    <Circle
      r={30}
      fill="#004638"
      strokeWidth={0}
      transform="translate(120.823 123.615)"
      onPress={props.GCTOnPress}
    />
    <Circle
      r={30}
      fill="#004638"
      strokeWidth={0}
      transform="translate(476.385 479.177)"
      onPress={props.RIVOnPress}
    />
    <Circle
      r={30}
      fill="#004638"
      strokeWidth={0}
      transform="translate(230.227 232.006)"
      onPress={props.IDSOnPress}
    />
    <Circle
      r={30}
      fill="#004638"
      strokeWidth={0}
      transform="translate(361.636 364.428)"
      onPress={props.PANOnPress}
    />
    <Circle
      r={30}
      fill="#004638"
      strokeWidth={0}
      transform="translate(421.636 424.428)"
      onPress={props.DUQOnPress}
    />
    <Circle
      r={30}
      fill="#004638"
      strokeWidth={0}
      transform="translate(470.385 118.615)"
      onPress={props.MSFOnPress}
    />
    <Circle
      r={30}
      fill="#004638"
      strokeWidth={0}
      transform="translate(542.685 232.006)"
      onPress={props.PCCOnPress}
    />
    <Circle
      r={30}
      fill="#004638"
      strokeWidth={0}
      transform="translate(120.823 473.177)"
      onPress={props.PCCROnPress}
    />
    <Circle
      r={24}
      fill={props.GCTColor ? props.GCTColor : '#f6f6f6'}
      strokeWidth={0}
      transform="translate(120.823 124.364)"
      onPress={props.GCTOnPress}
    />
    <Circle
      r={24}
      fill={props.MSFColor ? props.MSFColor : '#f6f6f6'}
      strokeWidth={0}
      transform="translate(470.385 118.364)"
      onPress={props.MSFOnPress}
    />
    <Circle
      r={24}
      fill={props.IDSColor ? props.IDSColor : '#f6f6f6'}
      strokeWidth={0}
      transform="translate(230.227 232.006)"
      onPress={props.IDSOnPress}
    />
    <Circle
      r={24}
      fill={props.PCCColor ? props.PCCColor : '#f6f6f6'}
      strokeWidth={0}
      transform="translate(542.685 232.006)"
      onPress={props.PCCOnPress}
    />
    <Circle
      r={24}
      fill={props.PANColor ? props.PANColor : '#f6f6f6'}
      strokeWidth={0}
      transform="translate(361.636 364.428)"
      onPress={props.PANOnPress}
    />
    <Circle
      r={24}
      fill={props.PCCRColor ? props.PCCRColor : '#f6f6f6'}
      strokeWidth={0}
      transform="translate(120.823 473.177)"
      onPress={props.PCCROnPress}
    />
    <Circle
      r={24}
      fill={props.DUQColor ? props.DUQColor : '#f6f6f6'}
      strokeWidth={0}
      transform="translate(421.636 424.428)"
      onPress={props.DUQOnPress}
    />
    <Circle
      r={24}
      fill={props.RIVColor ? props.RIVColor : '#f6f6f6'}
      strokeWidth={0}
      transform="translate(476.385 479.177)"
      onPress={props.RIVOnPress}
    />
    <Text
      strokeWidth={0}
      dx={0}
      dy={0}
      fontFamily='"enoQ81Dji3M1:::Lato"'
      fontSize={30}
      fontWeight={600}
      transform="translate(161.094 94.286)"
      onPress={props.GCTOnPress}
    >
      <TSpan y={0} />
      GCT
    </Text>
    <Text
      strokeWidth={0}
      dx={0}
      dy={0}
      fontFamily='"enoQ81Dji3M1:::Lato"'
      fontSize={30}
      fontWeight={700}
      transform="translate(267.777 201.928)"
      onPress={props.IDSOnPress}
    >
      <TSpan y={0} />
      IDS
    </Text>
    <Text
      strokeWidth={0}
      dx={0}
      dy={0}
      fontFamily='"enoQ81Dji3M1:::Lato"'
      fontSize={30}
      fontWeight={700}
      transform="translate(397.636 334.35)"
      onPress={props.PANOnPress}
    >
      <TSpan y={0} />
      PAN
    </Text>
    <Text
      strokeWidth={0}
      dx={0}
      dy={0}
      fontFamily='"enoQ81Dji3M1:::Lato"'
      fontSize={30}
      fontWeight={700}
      transform="translate(460.054 394.35)"
      onPress={props.DUQOnPress}
    >
      <TSpan y={0} />
      DUQ
    </Text>
    <Text
      strokeWidth={0}
      dx={0}
      dy={0}
      fontFamily='"enoQ81Dji3M1:::Lato"'
      fontSize={30}
      fontWeight={700}
      transform="translate(521.847 448.35)"
      onPress={props.RIVOnPress}
    >
      <TSpan y={0} />
      RIV
    </Text>
    <Text
      strokeWidth={0}
      dx={0}
      dy={0}
      fontFamily='"enoQ81Dji3M1:::Lato"'
      fontSize={30}
      fontWeight={700}
      transform="translate(500.385 88.286)"
      onPress={props.MSFOnPress}
    >
      <TSpan y={0} />
      MSF
    </Text>
    <Text
      strokeWidth={0}
      dx={0}
      dy={0}
      fontFamily='"enoQ81Dji3M1:::Lato"'
      fontSize={30}
      fontWeight={700}
      transform="translate(572.685 201.928)"
      onPress={props.PCCOnPress}
    >
      <TSpan y={0} />
      PCC
    </Text>
    <Text
      strokeWidth={0}
      dx={0}
      dy={0}
      fontFamily='"enoQ81Dji3M1:::Lato"'
      fontSize={30}
      fontWeight={700}
      transform="translate(145.836 443.1)"
      onPress={props.PCCROnPress}
    >
      <TSpan y={0} />
      PCCR
    </Text>
  </Svg>)
}
export default REM_Network
