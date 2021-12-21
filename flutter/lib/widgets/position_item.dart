import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/positions.dart';
import '../screens/invitation_screen.dart';

class PositionItem extends StatelessWidget {
  final String positionName;
  final String positionId;

  PositionItem(this.positionName, this.positionId);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: InkWell(
        onTap: () {
          // Navigator.of(context)
          //     .pushNamed(InvitationScreen.routeName, arguments: position);
          Navigator.of(context).pushNamed('/after_positions_screen',
              arguments: [positionName, positionId]);
        },
        child: Card(
          child: Row(
            children: <Widget>[
              Expanded(
                child: Container(
                  constraints: const BoxConstraints(
                    maxHeight: double.infinity,
                  ),
                  child: Padding(
                    child: Text(positionName),
                    padding: const EdgeInsets.only(bottom: 5, top: 5, left: 8),
                  ),
                ),
              ),
              IconButton(
                onPressed: () {
                  Provider.of<Positions>(context, listen: false)
                      .removePosition(positionId);
                },
                icon: const Icon(Icons.delete),
                color: Colors.red,
              )
            ],
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
          ),
        ),
      ),
    );
  }
}
