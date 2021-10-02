import 'package:flutter/material.dart';

class CirculeWidget extends StatelessWidget {
  const CirculeWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      Container(
        width: 200,
        height: 100,
        decoration: BoxDecoration(
          borderRadius: const BorderRadius.only(
              bottomLeft: Radius.circular(100),
              bottomRight: Radius.circular(100)),
          color: const Color(0xFF165DC0).withOpacity(0.7),
        ),
      ),
      Container(
        width: 100,
        height: 200,
        decoration: BoxDecoration(
          borderRadius: const BorderRadius.only(
              bottomRight: Radius.circular(100),
              topRight: Radius.circular(100)),
          color: const Color(0xFF165DC0).withOpacity(0.7),
        ),
      ),
    ]);
  }
}
